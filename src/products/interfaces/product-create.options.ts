import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductCreateOptions {
  @IsString()
  @ApiProperty({
    example: 'Name',
    description: 'Product name',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Product description',
    description: 'Description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    example: 'Name',
    description: 'Producer name',
  })
  producer: string;
}
