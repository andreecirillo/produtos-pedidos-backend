import { Controller, Post, Get, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('Pedidos')
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiBadRequestResponse({
    description: 'Estoque insuficiente para um ou mais produtos',
  })
  @ApiBody({
    schema: {
      example: {
        status: 'CONCLUIDO',
        produtos: [
          { productId: 1, quantidade: 2 },
          { productId: 2, quantidade: 1 },
        ],
      },
    },
  })
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  findAll() {
    return this.service.findAll();
  }
}
