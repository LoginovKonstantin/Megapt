import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductToGroupOptions {
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'Product id',
  })
  productId: number;

  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'Group id',
  })
  groupId: number;
}
