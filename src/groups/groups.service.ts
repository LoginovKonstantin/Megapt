import * as luxon from 'luxon';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { GroupModel } from './group.model';
import { GroupDto, GroupMapper } from './dtos';
import {
  GroupCreateOptions,
  GroupDeleteOptions,
  GroupEditOptions,
  GroupGetAllOptions,
  GroupGetOneOptions,
} from './interfaces';
import { Exceptions } from '../exceptions';
import { GroupProductModel } from './group-product.model';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);

  constructor(
    @InjectModel(GroupModel) private groupModel: typeof GroupModel,
    @InjectModel(GroupProductModel)
    private groupProductModel: typeof GroupProductModel,
  ) {}

  async getOne(options: GroupGetOneOptions): Promise<GroupDto | null> {
    const group = await this.groupModel.findByPk(options.id);
    return group ? GroupMapper.toDto(group) : null;
  }

  async getAll(
    options: GroupGetAllOptions,
  ): Promise<{ items: GroupDto[]; count: number }> {
    const groups = await this.groupModel.findAndCountAll({
      limit: options.limit || 50,
      offset: options.offset || 0,
    });

    return {
      items: groups.rows.map(GroupMapper.toDto),
      count: groups.count,
    };
  }

  async create(options: GroupCreateOptions): Promise<GroupDto> {
    this.logger.log(`Create group ${JSON.stringify(options)}`);
    const { name, parentId } = options;

    await this.checkGroupByName(name);

    if (parentId) {
      await this.checkGroupConditions(parentId);
    }

    return this.groupModel.create({ ...options }).then(GroupMapper.toDto);
  }

  async edit(options: GroupEditOptions): Promise<GroupDto> {
    this.logger.log(`Edit group ${JSON.stringify(options)}`);
    const { id, name, parentId } = options;

    const currentGroup = await this.groupModel.findByPk(id);

    if (!currentGroup) {
      throw Exceptions.getNotFoundException(`Group with id <${id}> not found`);
    }

    if (name && currentGroup.name !== name) {
      await this.checkGroupByName(name);
      currentGroup.set('name', name);
    }

    if (parentId === 0) {
      // условие при котором группа становится корневой
      currentGroup.set('parentId', null);
    } else if (parentId && parentId === id) {
      throw Exceptions.getConflictException(
        `Group cannot have the same id <${id}> in parentId <${parentId}>`,
      );
    } else if (parentId) {
      await this.checkGroupConditions(parentId, id);
      currentGroup.set('parentId', parentId);
    }

    if (currentGroup.changed()) {
      this.logger.log(`Group <${id}> has changed`);
      currentGroup.set('updatedAt', luxon.DateTime.now());
      await currentGroup.save();
      await currentGroup.reload();
    }

    return GroupMapper.toDto(currentGroup);
  }

  async delete(options: GroupDeleteOptions): Promise<void> {
    this.logger.log(`Delete group ${JSON.stringify(options)}`);
    const id = options.id;

    const hasChildGroup = await this.groupModel.findOne({
      where: { parentId: id },
    });

    if (hasChildGroup) {
      throw Exceptions.getConflictException(`Group <${id}> has child groups`);
    }

    const hasProduct = await this.groupProductModel.findOne({
      where: { groupId: id },
    });

    if (hasProduct) {
      throw Exceptions.getConflictException(`Group <${id}> has products`);
    }

    await this.groupModel.destroy({ where: { id } });
  }

  private async checkGroupConditions(parentId: number, groupId?: number) {
    // если группы (как родителя) с таким id нет, возможности привязать группу нет
    const group = await this.groupModel.findByPk(parentId, {
      include: 'groupsProducts',
    });

    if (!group) {
      throw Exceptions.getConflictException(
        `Parent group with id <${parentId}> does not exist`,
      );
    }

    // если в группе (родителе) есть продкут, значит она не может иметь группу как потомка
    if (group.groupsProducts.length > 0) {
      throw Exceptions.getConflictException(`Group <${parentId}> has product`);
    }

    if (groupId && groupId === group.parentId) {
      throw Exceptions.getConflictException('Warn, recursive group');
    }
  }

  private async checkGroupByName(name: string): Promise<void> {
    const group = await this.groupModel.findOne({
      where: { name },
    });

    if (group) {
      throw Exceptions.getConflictException(
        `Group with same name has already exist <${name}>`,
      );
    }
  }
}
