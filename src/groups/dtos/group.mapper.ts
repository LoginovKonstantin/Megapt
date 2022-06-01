import { GroupModel } from '../group.model';
import { GroupDto } from './group.dto';

export class GroupMapper {
  static toDto(group: GroupModel): GroupDto {
    return {
      id: group.id,
      name: group.name,
      parentId: group.parentId,
    };
  }
}
