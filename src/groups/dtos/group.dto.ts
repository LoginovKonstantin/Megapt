import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty({
    example: '1',
    description: 'Group id',
  })
  public id: number;

  @ApiProperty({
    example: 'Name',
    description: 'Group name',
  })
  public name: string;

  @ApiProperty({
    example: 'null',
    description: 'Parent group id',
  })
  public parentId: number;
}

export class GroupsDto {
  @ApiProperty({
    description: 'Groups array',
    type: [GroupDto],
  })
  public items: GroupDto[];

  @ApiProperty({
    example: '1',
    description: 'count',
  })
  public count: number;
}
