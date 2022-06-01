import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ProductGetOneOptions {
  @IsNumberString()
  @ApiProperty({
    required: false,
    example: '1',
    description: 'Product id',
  })
  id: number;
}
