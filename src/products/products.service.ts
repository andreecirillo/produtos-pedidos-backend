import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  create(data: any) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  async update(id: number, data: any) {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException('Produto não encontrado');

    return this.repository.update(id, data);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
