import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from '@/printer/printer.module';
import { InvoicesModule } from '@/invoices/invoices.module';

@Module({
  imports: [PrinterModule, InvoicesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
