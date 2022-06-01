import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupEditOptions {
  @IsNumber()
  @ApiProperty({
    required: true,
    example: '1',
    description: 'Group id',
  })
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Name',
    description: 'New group name',
  })
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: '1',
    description: 'New parent id',
  })
  parentId?: number;
}
