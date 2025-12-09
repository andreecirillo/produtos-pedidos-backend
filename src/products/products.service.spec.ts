import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<ProductsRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new ProductsService(repository);
  });

  it('deve lançar erro ao atualizar produto inexistente', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
      service.update(1, { nome: 'Teste' }),
    ).rejects.toThrow(NotFoundException);
  });
});
