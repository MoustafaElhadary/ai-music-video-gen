import { Module } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { TrpcService } from '@server/trpc/trpc.service';
import { VideoQueueModule } from '@server/video/video-queue.module';
import { GenerationRequestRouter } from './generation-request.router';
import { GenerationRequestService } from './generation-request.service';
import { SupabaseService } from '@server/supabase/supabase.service';
import { ReplicateService } from '@server/replicate/replicate.service';

@Module({
  imports: [VideoQueueModule],
  providers: [
    GenerationRequestService,
    GenerationRequestRouter,
    PrismaService,
    TrpcService,
    SupabaseService,
    ReplicateService,
  ],
  exports: [GenerationRequestService, GenerationRequestRouter],
})
export class GenerationRequestModule {}
