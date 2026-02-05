import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsPositive,
  IsInt,
  IsUUID,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class InvoiceItem {
  @ApiProperty({ example: 'Item' })
  @IsString()
  description: string;
  @ApiProperty({ example: 2 })
  @IsInt()
  @IsPositive()
  quantity: number;
  @ApiProperty({ example: 100000 })
  @IsPositive()
  unit_price: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 'Company ID' })
  @IsUUID()
  company_id: string;
  @ApiProperty({ example: 'Customer ID' })
  @IsUUID()
  customer_id: string;
  @ApiProperty({
    type: [InvoiceItem],
    description: 'List of invoice items',
  })
  @ValidateNested({ each: true })
  @Type(() => InvoiceItem)
  @ArrayMinSize(1)
  items: InvoiceItem[];
}
