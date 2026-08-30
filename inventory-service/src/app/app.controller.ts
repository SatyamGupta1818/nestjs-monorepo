import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type { CheckStockResponse } from './interfaces/app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @GrpcMethod('InventoryService', 'CheckStock')
  checkStock(data: { productId: string; }): CheckStockResponse {
    return this.appService.checkStock(data);
  }
}
