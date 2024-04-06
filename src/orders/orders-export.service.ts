// src/orders/orders-export.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { Order } from '../interfaces/order.interface'; // Adjust path as needed
import * as Json2csvParser from 'json2csv';

@Injectable()
export class OrdersExportService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly mailerService: MailerService,
  ) {}

  async fetchOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async generateCsv(orders: Order[]): Promise<string> {
    const parser = new Json2csvParser.Parser();
    return parser.parse(orders);
  }

  async sendEmailWithCsv(csvData: string): Promise<void> {
    await this.mailerService.sendMail({
      to: 'recipient@example.com', // list of receivers
      subject: 'Orders Export', // Subject line
      text: 'Attached is the orders export CSV file.', // plaintext body
      html: '<p>Attached is the orders export CSV file.</p>', // HTML body content
      attachments: [
        {
          filename: `Orders_${new Date().toISOString()}.csv`,
          content: csvData,
        },
      ],
    });
  }

  async exportOrdersAndSendEmail(): Promise<void> {
    const orders = await this.fetchOrders();
    const csvData = await this.generateCsv(orders);
    await this.sendEmailWithCsv(csvData);
  }
}