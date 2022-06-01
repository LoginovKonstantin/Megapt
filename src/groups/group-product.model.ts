import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductModel } from '../products/product.model';
import { GroupModel } from './group.model';

@Table({ modelName: 'groups_products' })
export class GroupProductModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  public productId!: number;

  @BelongsTo(() => ProductModel)
  public product!: ProductModel;

  @ForeignKey(() => GroupModel)
  @Column(DataType.INTEGER)
  public groupId!: number;

  @BelongsTo(() => GroupModel)
  public group!: GroupModel;
}
