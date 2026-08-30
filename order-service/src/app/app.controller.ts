import { Controller, Get, Inject, OnModuleInit, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

interface InventoryServiceClient {
  checkStock(data: { productId: string }): Observable<{ availableQuantity: number; inStock: boolean; productName: string }>;
}

@Controller('orders')
export class AppController implements OnModuleInit {

  private inventoryServiceClient!: InventoryServiceClient;

  constructor(
    private readonly appService: AppService,
    @Inject('INVENTORY_SERVICE') private readonly inventoryService: ClientGrpc,
  ) { }

  onModuleInit() {
    this.inventoryServiceClient = this.inventoryService.getService<InventoryServiceClient>('InventoryService');
  }


  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    return this.appService.createOrderForUser(userId);
  }

  @Get("check-item")
  async checkItem(@Query('productId') productId: string) {
    const stockResponse = await lastValueFrom(this.inventoryServiceClient.checkStock({ productId }));
    if (stockResponse.inStock) {
      return { message: `Product ${stockResponse.productName} is in stock with quantity ${stockResponse.availableQuantity}.` };
    } else {
      return { message: `Product ${stockResponse.productName} is out of stock.` };
    }

  }
}
