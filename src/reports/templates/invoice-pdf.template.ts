import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Invoice } from '../../invoices/entities/invoice.entity';

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
          { text: `Fecha: ${invoice.issue_date.toISOString().split('T')[0]}` },
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
            `$ ${item.unit_price}`,
            `$ ${item.total}`,
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
              ['Subtotal', `$ ${invoice.subtotal}`],
              ['IVA (19%)', `$ ${invoice.tax}`],
              [
                { text: 'TOTAL', bold: true },
                { text: `$ ${invoice.total}`, bold: true },
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
