import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { GroupProductModel } from '../groups/group-product.model';

@Table({ modelName: 'products' })
export class ProductModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.TEXT)
  public name!: string;

  @Column(DataType.TEXT)
  public description!: string;

  @Column(DataType.TEXT)
  public producer!: string;

  @Column(DataType.DATE)
  public createdAt!: string;

  @Column(DataType.DATE)
  public updatedAt!: string;

  @HasMany(() => GroupProductModel)
  public groupsProducts!: GroupProductModel[];
}
