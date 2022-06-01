import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { GroupProductModel } from './group-product.model';

@Table({ modelName: 'groups' })
export class GroupModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.TEXT)
  public name!: string;

  @Column(DataType.INTEGER)
  public parentId!: number;

  @Column(DataType.DATE)
  public createdAt!: string;

  @Column(DataType.DATE)
  public updatedAt!: string;

  @HasMany(() => GroupProductModel)
  public groupsProducts!: GroupProductModel[];
}
