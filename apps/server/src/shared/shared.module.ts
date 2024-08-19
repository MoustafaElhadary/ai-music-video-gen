import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { ReplicateService } from '@server/replicate/replicate.service';
import { SupabaseService } from '@server/supabase/supabase.service';
import { TrpcService } from '@server/trpc/trpc.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PrismaService, TrpcService, SupabaseService, ReplicateService],
  exports: [
    PrismaService,
    TrpcService,
    SupabaseService,
    ReplicateService,
    ConfigModule,
  ],
})
export class SharedModule {}
