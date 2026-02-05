import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPositive, IsInt } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({ example: 'INV-111' })
  invoice_number: string;
  @ApiProperty({ example: '2024-01-01' })
  issue_date: Date;
  @ApiProperty({ example: 100000.0 })
  subtotal: number;
  @ApiProperty({ example: 19000.0 })
  tax: number;
  @ApiProperty({ example: 119000.0 })
  total: number;
}

export class CreateInvoiceItemDto {
  @ApiProperty({ example: 'Item' })
  @IsString()
  description: string;
  @ApiProperty({ example: 2 })
  @IsInt()
  @IsPositive()
  quantity: number;
  @ApiProperty({ example: 100000.0 })
  @IsPositive()
  unit_price: number;
}
