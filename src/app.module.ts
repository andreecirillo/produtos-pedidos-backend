import {
  Module,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsRepository } from './products/products.repository';

import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersRepository } from './orders/orders.repository';

import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [
    ProductsController,
    OrdersController,
  ],
  providers: [
    PrismaService,

    ProductsService,
    ProductsRepository,

    OrdersService,
    OrdersRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
