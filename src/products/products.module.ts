import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ProductModel } from './product.model';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { GroupProductModel } from '../groups/group-product.model';
import { GroupModel } from '../groups/group.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([ProductModel, GroupProductModel, GroupModel]),
  ],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
