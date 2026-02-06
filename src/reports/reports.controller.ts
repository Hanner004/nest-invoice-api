import { Controller, Get, Param, Res, ParseUUIDPipe } from '@nestjs/common';
import type { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('invoice/:id')
  async generateInvoiceReportPdf(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const pdfDoc = await this.reportsService.generateInvoiceReportPdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=factum-${id}.pdf`,
    );
    pdfDoc.info.Title = 'Factura';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
