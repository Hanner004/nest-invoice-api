import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '@/invoices/entities/invoice.entity';
import { InvoiceItem } from '@/invoices/entities/invoiceItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService], // Export the InvoicesService to be used in ReportsService
})
export class InvoicesModule {}
