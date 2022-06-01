import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    example: '1',
    description: 'Product id',
  })
  public id: number;

  @ApiProperty({
    example: 'Name',
    description: 'Product name',
  })
  public name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  public description: string;

  @ApiProperty({
    example: 'Producer name',
    description: 'Producer name',
  })
  public producer: string;
}

export class ProductsDto {
  @ApiProperty({
    description: 'Products array',
    type: [ProductDto],
  })
  public items: ProductDto[];

  @ApiProperty({
    example: '1',
    description: 'count',
  })
  public count: number;
}
