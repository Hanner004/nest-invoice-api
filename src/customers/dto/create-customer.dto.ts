import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name: string;
  @ApiProperty({ example: '123456789' })
  @IsString()
  document_number: string;
  @ApiProperty({ example: '656 Main Street' })
  @IsString()
  address: string;
}
