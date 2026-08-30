import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    return this.appService.createOrderForUser(userId);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
