import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.order.create({
      data,
      include: { items: true },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
    });
  }
}
