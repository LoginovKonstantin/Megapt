import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { GroupDto, GroupsDto } from './dtos';
import {
  GroupCreateOptions,
  GroupDeleteOptions,
  GroupEditOptions,
  GroupGetAllOptions,
  GroupGetOneOptions,
} from './interfaces';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Get group by id' })
  @ApiOkResponse({
    description: 'Get group by id',
    type: GroupDto,
  })
  @Get(':id')
  async getOne(@Param() options: GroupGetOneOptions): Promise<GroupDto> {
    return this.groupsService.getOne(options);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiOkResponse({
    description: 'Get all groups',
    type: GroupsDto,
  })
  @Get(':limit/:offset')
  async getAll(
    @Param() options: GroupGetAllOptions,
  ): Promise<{ items: GroupDto[]; count: number }> {
    return this.groupsService.getAll(options);
  }

  @ApiOperation({ summary: 'Create group' })
  @ApiConflictResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Group with same name has already exist',
          },
        },
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Group <id> has product',
          },
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'Group successful created',
    type: GroupDto,
  })
  @Post('')
  async create(@Body() options: GroupCreateOptions): Promise<GroupDto> {
    return this.groupsService.create(options);
  }

  @ApiOperation({ summary: 'Edit group' })
  @ApiNotFoundResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Group with id <${id}> not found',
          },
        },
      ],
    },
  })
  @ApiConflictResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Group with same name has already exist',
          },
        },
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message:
              'Group cannot have the same id <${id}> in parentId <${parentId}>',
          },
        },
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Warn, recursive group',
          },
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'Group successful changed',
    type: GroupEditOptions,
  })
  @Put('')
  async edit(@Body() options: GroupEditOptions): Promise<GroupDto> {
    return this.groupsService.edit(options);
  }

  @ApiOperation({ summary: 'Delete group' })
  @ApiConflictResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Group <id> has child groups',
          },
        },
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Group <id> has products',
          },
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'Group successful deleted',
    type: GroupDto,
  })
  @Delete(':id')
  async delete(@Param() options: GroupDeleteOptions): Promise<void> {
    return this.groupsService.delete(options);
  }
}
