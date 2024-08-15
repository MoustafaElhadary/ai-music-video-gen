import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GenerationRequestService } from './generation-request/generation-request.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly generationRequestService: GenerationRequestService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('paid-event')
  async test(): Promise<string> {
    await this.generationRequestService.handleSuccessfulPayment(
      'clzop40j6000098slrpdvb2ns', // TODO: remove hardcoded id
    );
    return 'test';
  }
}
