import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GroupDeleteOptions {
  @IsNumberString()
  @ApiProperty({
    required: true,
    example: '1',
    description: 'Group id',
  })
  id: number;
}
