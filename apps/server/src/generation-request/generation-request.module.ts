import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReplicateService } from '../replicate/replicate.service';
import { SupabaseService } from '../supabase/supabase.service';
import { TrpcService } from '../trpc/trpc.service';
import { VideoQueueModule } from '../video/video-queue.module';
import { GenerationRequestRouter } from './generation-request.router';
import { GenerationRequestService } from './generation-request.service';

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
