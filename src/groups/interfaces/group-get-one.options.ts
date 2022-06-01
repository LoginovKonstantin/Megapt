import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GroupGetOneOptions {
  @IsNumberString()
  @ApiProperty({
    required: false,
    example: '1',
    description: 'Group id',
  })
  id: number;
}
