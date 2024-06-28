import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma/prisma.service';
import { SunoApiModule } from './suno-api/suno-api.module';
import { SunoApiService } from './suno-api/suno-api.service';
import { TrpcModule } from './trpc/trpc.module';
import { VideoQueueModule } from './video/video-queue.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TrpcModule,
    VideoQueueModule,
    SunoApiModule.register(),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
