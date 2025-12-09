import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { BadRequestException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

describe('OrdersService', () => {
  let service: OrdersService;

  let repository: {
    create: jest.Mock;
    findAll: jest.Mock;
  };

  let prisma: {
    product: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    prisma = {
      product: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    service = new OrdersService(repository as any, prisma as any);
  });

  it('deve falhar ao criar pedido com estoque insuficiente', async () => {
    prisma.product.findUnique.mockResolvedValue({
      id: 1,
      preco: 10,
      quantidadeEstoque: 1,
    });

    await expect(
      service.create({
        status: OrderStatus.CONCLUIDO,
        produtos: [{ productId: 1, quantidade: 5 }],
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
