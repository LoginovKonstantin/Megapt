import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GroupCreateOptions {
  @IsString()
  @ApiProperty({
    example: 'Name',
    description: 'Group name',
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: '1',
    description: 'Parent group id, set 0 if you want make group as root group',
  })
  parentId: number;
}
