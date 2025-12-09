import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Produto A',
        categoria: 'Categoria X',
        descricao: 'Descrição do produto',
        preco: 10,
        quantidadeEstoque: 100,
      },
    },
  })
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar produtos' })
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Produto A',
        categoria: 'Categoria X',
        descricao: 'Nova descrição',
        preco: 12,
        quantidadeEstoque: 80,
      },
    },
  })
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover produto' })
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
