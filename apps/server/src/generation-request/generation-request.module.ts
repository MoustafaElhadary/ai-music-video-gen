import { Module } from '@nestjs/common';
import { GenerationRequestRouter } from './generation-request.router';
import { GenerationRequestService } from './generation-request.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { TrpcService } from '@server/trpc/trpc.service';

@Module({
  providers: [
    GenerationRequestService,
    GenerationRequestRouter,
    PrismaService,
    TrpcService,
  ],
  exports: [GenerationRequestService, GenerationRequestRouter],
})
export class GenerationRequestModule {}
