import { openai } from '@ai-sdk/openai';
import { Injectable, Logger } from '@nestjs/common';
import { $Enums, RequestStatus } from '@prisma/client';
import { USER_UPLOAD_FOLDER } from '@server/core/constants';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { ReplicateService } from '@server/replicate/replicate.service';
import { SupabaseService } from '@server/supabase/supabase.service';
import { generateObject } from 'ai';
import { z } from 'zod';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  constructor(
    private generationRequestService: GenerationRequestService,
    private supabaseService: SupabaseService,
    private replicateService: ReplicateService,
  ) {}

  async processImages(id: string): Promise<void> {
    const generationRequest =
      await this.generationRequestService.requestByIdWithImages(id);
    if (!generationRequest || !generationRequest.sunoLyrics) {
      throw new Error('Generation request or lyrics not found');
    }

    if (generationRequest.videoImages?.length > 5) {
      this.logger.log('Images already generated, skipping...');
      return;
    }

    await this.generationRequestService.simpleUpdate(id, {
      status: RequestStatus.IMAGE_PROCESSING,
    });

    const imageDescriptions = await this.generateImageDescriptions(
      generationRequest.srt ?? generationRequest.sunoLyrics,
    );
    this.logger.log('Image descriptions generated', imageDescriptions);

    // Fetch uploaded images from Supabase storage
    const uploadedImages = await this.fetchUploadedImagesFromSupabase(id);

    const imageUrls = await Promise.all(
      imageDescriptions.map((desc, index) => {
        const uploadedImage =
          uploadedImages.length > 0
            ? uploadedImages[index % uploadedImages.length]
            : undefined;
        return this.generateImage(desc.prompt, uploadedImage, desc.style_name);
      }),
    );

    await Promise.all(
      imageUrls.map((imageUrl) => {
        return this.addVideoImage(id, imageUrl, 'AI_GENERATED');
      }),
    );

    await this.generationRequestService.simpleUpdate(id, {
      status: RequestStatus.IMAGE_PROCESSED,
    });
  }

  private async fetchUploadedImagesFromSupabase(
    generationRequestId: string,
  ): Promise<string[]> {
    return (
      await this.supabaseService.listFiles(
        USER_UPLOAD_FOLDER,
        generationRequestId,
      )
    )
      ?.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
      ?.map(
        (file) =>
          this.supabaseService.getPublicUrl(
            USER_UPLOAD_FOLDER,
            `${generationRequestId}/${file.name}`,
          ).data.publicUrl,
      );
  }

  AiImageDescriptionSchema = z.object({
    imageDescriptions: z.array(
      z.object({
        prompt: z.string(),
        startTime: z.number(),
        endTime: z.number(),
        style_name: z.enum([
          '(No style)',
          'Cinematic',
          'Disney Charactor',
          'Digital Art',
          'Photographic (Default)',
          'Fantasy art',
          'Neonpunk',
          'Enhance',
          'Comic book',
          'Lowpoly',
          'Line art',
        ]),
      }),
    ),
  });

  private async generateImageDescriptions(
    lyrics: string,
  ): Promise<
    z.infer<typeof this.AiImageDescriptionSchema>['imageDescriptions']
  > {
    const prompt = `
    Given the following song lyrics, generate 10 image descriptions that capture key moments or themes from the song. 
    Each description should include a prompt for image generation and a timestamp (in seconds) for when the image should appear in the video.
    Make the descriptions extremely fun, hilariously funny, intriguing, and interesting. 
    Think outside the box and create unexpected, whimsical, and captivating scenes that will surprise and delight viewers.
    extremely fun, hilariously funny, deeply intriguing, eye-poppingly interesting, vibrant colors, unexpected elements, whimsical scene, surprising details.
    Always include the word "img" (in lower case) in the prompt. and always include the user in the prompt.
    Make sure the prompts all have the same style and follow the same storyline. you are telling a story through those images.
    Make sure the prompts are all unique and not repetitive.
    Lyrics:
    ${lyrics}
    `;

    const result = await generateObject({
      model: openai('gpt-4'),
      schema: this.AiImageDescriptionSchema,
      prompt,
      maxRetries: 3,
    });

    return result.object.imageDescriptions.map((desc) => {
      let normalizedPrompt = desc.prompt.toLowerCase().replace(/img/g, '');

      normalizedPrompt = 'img ' + normalizedPrompt.trim();

      return {
        ...desc,
        prompt: normalizedPrompt,
      };
    });
  }

  private async generateImage(
    prompt: string,
    inputImage?: string,
    styleName?: string,
  ): Promise<string> {
    let output: string[];
    if (inputImage) {
      output = await this.replicateService.generateImageWithBasePhoto(
        prompt,
        inputImage,
        styleName,
      );
    } else {
      output = await this.replicateService.generateImage(prompt);
    }

    if (Array.isArray(output) && output.length > 0 && output[0]) {
      // Upload the image to Supabase
      const imageUrl = await this.uploadImageToSupabase(output[0]);
      return imageUrl;
    }
    throw new Error('Failed to generate image');
  }

  private async uploadImageToSupabase(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const filename = `image-${Date.now()}.png`;

    const data = await this.supabaseService.uploadFile(
      'ai-generated-images',
      filename,
      Buffer.from(buffer),
      {
        contentType: 'image/png',
      },
    );

    return this.supabaseService.getPublicUrl('ai-generated-images', data.path)
      .data.publicUrl;
  }

  async addVideoImage(
    generationRequestId: string,
    imageUrl: string,
    imageType: $Enums.ImageType,
  ): Promise<void> {
    await this.generationRequestService.addVideoImage(
      generationRequestId,
      imageUrl,
      imageType,
    );
  }
}
