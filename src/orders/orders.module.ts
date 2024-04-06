import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema } from '../schema/order.schema';
//import { OrdersExportService } from './orders-export/orders-export.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
