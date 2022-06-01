import { ApiProperty } from '@nestjs/swagger';

export class InfoDto {
  @ApiProperty({
    example: '1',
    description: 'Is main instance',
  })
  isMain: string;

  @ApiProperty({
    example: 'oyf71',
    description: 'Instance id',
  })
  instanceId: string;
}
