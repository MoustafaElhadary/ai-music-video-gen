import { openai } from '@ai-sdk/openai';
import { CoreMessage, generateObject } from 'ai';
import { SceneData, SceneDataArraySchema, ScenesRequestParams } from '../types';

import { z } from 'zod';

const systemPrompt = `Today's date is ${new Date().toLocaleDateString()}.
You are a Gen Z creative director known for crafting viral, witty, and emotionally resonant TikTok-style videos.
Your task is to create a 60-second birthday video that's a rollercoaster of emotions and humor.

Key points:
- Create 15-20 dynamic scenes, each lasting 2-5 seconds. Scenes can overlap to maintain high energy.
- Use a mix of text overlays, background gradients, and various media types (images, videos, SVGs) for visual variety.
- Employ detailed Tailwind CSS classes for sleek, modern styling. Use large text styles (minimum text-4xl, preferably text-6xl).
- Inject humor, pop culture references, and unexpected twists.
- Maintain a storyline that celebrates the person while keeping viewers engaged.
- Use complex animations and transitions (e.g., Move, Rotate, Zoom, Bounce) with specific parameters.
- Vary text sizes, styles, and positions for emphasis and rhythm.
- Include gradient backgrounds using Tailwind classes (e.g., bg-gradient-to-r from-green-400 to-blue-500).
- Allow scenes to start at specific times and overlap when appropriate.
- For each scene, consider how it contributes to the overall narrative and emotional journey.

Remember, we're aiming for a video that's entertaining, potentially viral, and deeply personal to the birthday person.

Output your response as a JSON array of scene objects, each containing the following properties:
- name (optional): A descriptive name for the scene
- durationInSeconds: Duration of the scene
- startFrom: Start time of the scene in seconds
- text (optional): Text content for the scene
- textStyle (optional): Tailwind CSS classes for text styling
- mediaStyle (optional): Tailwind CSS classes for media styling
- bgStyle (optional): Tailwind CSS classes for background styling
- animation (optional): Array of animation codes
`;

const userPrompt = `Create a TikTok-style birthday video for my mother, Maha.`;

export const messages: CoreMessage[] = [
  { role: 'system', content: systemPrompt },
  { role: 'user', content: userPrompt },
];

export const fetchAIScenes = async ({ fieldNames }: ScenesRequestParams) => {
  const result = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: z.object({
      records: SceneDataArraySchema,
    }),
    messages,
    maxRetries: 3,
  });

  console.log('Generated Scenes:', result.object);

  const data: SceneData[] = result.object.records
    .filter((record) => record.durationInSeconds)
    .map((record) => ({
      durationInSeconds: record.durationInSeconds,
      startFrom: record.startFrom,
      // TODO: remove
      // media: record.media?.map(
      // 	({url, type}: {url: string; type: string}) => ({url, type}),
      // ),
      media: undefined, //TODO: remove
      text: record.text,
      name: fieldNames.name ? record.name : '',
      textStyle: fieldNames.textStyle ? record.textStyle : undefined,
      mediaStyle: fieldNames.mediaStyle ? record.mediaStyle : undefined,
      bgStyle: fieldNames.bgStyle ? record.bgStyle : undefined,
      animation: fieldNames.animation ? record.animation : undefined,
      // volume: fieldNames.volume ? record.volume : null,
      volume: undefined, //TODO: remove
    }));

  const dataWithStartFrom = (): [SceneData[], number] => {
    let timePointer = 0;
    let duration = 0;
    const dataWithStartTimes = data.map((scene: SceneData) => {
      const startFrom = scene.startFrom ?? timePointer;
      timePointer = startFrom + scene.durationInSeconds;
      // This logic was putting pointer behind the latest time
      // timePointer =
      //   startFrom + scene.durationInSeconds > timePointer
      //     ? startFrom + scene.durationInSeconds
      //     : timePointer;
      duration = timePointer > duration ? timePointer : duration;

      return { ...scene, startFrom };
    });

    return [dataWithStartTimes, duration];
  };

  return dataWithStartFrom();
};
