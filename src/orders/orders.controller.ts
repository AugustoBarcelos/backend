import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
//import { OrdersExportService } from './orders-export/orders-export.service'; // Ensure this path is correct
import { AuthGuard } from '@nestjs/passport';
//import {exportOrdersAndSendEmail} from './orders-export.service';

@Controller('orders')
@UseGuards(AuthGuard('jwt')) 
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    //private readonly ordersExportService: OrdersExportService // Inject OrdersExportService
  ) {}

  @Post()
  async create(@Body() createOrderDto: any) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }


}
