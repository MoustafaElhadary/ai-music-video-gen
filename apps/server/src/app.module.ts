import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), TrpcModule],
  controllers: [AppController],
  providers: [AppService, BookService, PrismaService],
})
export class AppModule {}
