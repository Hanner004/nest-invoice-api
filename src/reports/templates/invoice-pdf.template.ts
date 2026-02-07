import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Invoice } from '../../invoices/entities/invoice.entity';

function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export const invoicePdfTemplate = (invoice: Invoice): TDocumentDefinitions => ({
  content: [
    { text: 'FACTURA', style: 'header' },

    {
      columns: [
        [
          { text: invoice.company.name, bold: true },
          { text: `NIT: ${invoice.company.nit}` },
        ],
        [
          { text: `Factura No: ${invoice.invoice_number}` },
          { text: `Fecha: ${formatDate(invoice.issue_date)}` },
        ],
      ],
    },

    { text: '\nCliente', style: 'subheader' },
    { text: `${invoice.customer.name} ${invoice.customer.last_name}` },
    { text: `Documento: ${invoice.customer.document_number}` },
    { text: `Dirección: ${invoice.customer.address}` },

    { text: '\nDetalle', style: 'subheader' },

    {
      table: {
        widths: ['auto', '*', 'auto', 'auto', 'auto'],
        body: [
          ['#', 'Descripción', 'Cantidad', 'Precio', 'Total'],
          ...invoice.items.map((item, index) => [
            index + 1,
            item.description,
            item.quantity,
            formatCOP(item.unit_price),
            formatCOP(item.total),
          ]),
        ],
      },
    },

    { text: '\n' },

    {
      columns: [
        { width: '*', text: '' },
        {
          width: 'auto',
          table: {
            body: [
              ['Subtotal', formatCOP(invoice.subtotal)],
              ['IVA (19%)', formatCOP(invoice.tax)],
              [
                { text: 'TOTAL', bold: true },
                { text: formatCOP(invoice.total), bold: true },
              ],
            ],
          },
        },
      ],
    },
  ],

  styles: {
    header: {
      fontSize: 18,
      bold: true,
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 4],
    },
  },
});
