import { Injectable } from '@nestjs/common';
import { CheckStockResponse } from './interfaces/app.interface';
@Injectable()
export class AppService {
  checkStock(data: { productId: string; }): CheckStockResponse {
    const { productId } = data;

    const products = [
      { id: '1', name: 'Product 1', stock: 10 },
      { id: '2', name: 'Product 2', stock: 5 },
      { id: '3', name: 'Product 3', stock: 0 }
    ];

    const product = products.find(p => p.id === productId);
    const inStock = !!product && product.stock > 0;

    return { availableQuantity: product ? product.stock : 0, inStock, productName: product ? product.name : '' };
  }
}
