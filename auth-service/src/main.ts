import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '192.168.0.102',
      port: 5001,
    },
  });
  await app.listen();
  Logger.log('Auth microservice is listening on 192.168.0.102:5001');
}

bootstrap();
