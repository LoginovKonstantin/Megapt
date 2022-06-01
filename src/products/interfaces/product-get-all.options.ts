import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class ProductGetAllOptions {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: '50',
    description: 'Count items (default = 50)',
  })
  limit: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: '0',
    description: 'Offset (default = 0)',
  })
  offset: number;
}
