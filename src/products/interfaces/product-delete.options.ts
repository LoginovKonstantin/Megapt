import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ProductDeleteOptions {
  @IsNumberString()
  @ApiProperty({
    required: true,
    example: '1',
    description: 'Product id',
  })
  id: number;
}
