import { Injectable } from '@nestjs/common';
import { PrinterService } from '@/printer/printer.service';
import { InvoicesService } from '@/invoices/invoices.service';
import { invoicePdfTemplate } from './templates/invoice-pdf.template';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printer: PrinterService,
    private readonly invoicesService: InvoicesService,
  ) {}

  async generateInvoiceReportPdf(id: string): Promise<PDFKit.PDFDocument> {
    const invoice = await this.invoicesService.findOne(id);
    const docDefinition = invoicePdfTemplate(invoice);
    return this.printer.createPdf(docDefinition);
  }
}
