import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(body: {
    status: OrderStatus;
    produtos: { productId: number; quantidade: number }[];
  }) {
    let total = 0;

    for (const item of body.produtos) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.quantidadeEstoque < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto ${item.productId}`,
        );
      }

      total += product.preco * item.quantidade;
    }

    if (body.status === OrderStatus.CONCLUIDO) {
      for (const item of body.produtos) {
        await this.prisma.product.update({
          where: { id: item.productId },
          data: {
            quantidadeEstoque: {
              decrement: item.quantidade,
            },
          },
        });
      }
    }

    return this.repository.create({
      status: body.status,
      total,
      items: {
        create: body.produtos.map((p) => ({
          productId: p.productId,
          quantidade: p.quantidade,
        })),
      },
    });
  }

  findAll() {
    return this.repository.findAll();
  }
}
