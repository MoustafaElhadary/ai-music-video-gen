import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('retry/:id')
  async handlePaidEvent(@Param('id') id: string): Promise<string> {
    await this.generationRequestService.handleSuccessfulPayment(id);
    return `Added job ${id} back to queue `;
  }
}
