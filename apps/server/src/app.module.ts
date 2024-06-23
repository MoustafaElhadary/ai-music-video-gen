import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma/prisma.service';
import { TrpcModule } from './trpc/trpc.module';
import { QueueModule } from './queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TrpcModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, BookService, PrismaService],
})
export class AppModule {}
