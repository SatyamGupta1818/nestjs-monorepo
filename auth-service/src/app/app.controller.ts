import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: "validate_user" })
  handleUserValidation(@Payload() data: any) {
    const { username, password, userId } = data;
    return this.appService.validateUser(username, password, userId);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
