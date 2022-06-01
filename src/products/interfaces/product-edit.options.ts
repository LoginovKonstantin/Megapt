import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEditOptions {
  @IsNumber()
  @ApiProperty({
    required: true,
    example: '1',
    description: 'Product id',
  })
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Name',
    description: 'New product name',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Product description',
    description: 'New description',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Name',
    description: 'New producer name',
  })
  producer?: string;
}
