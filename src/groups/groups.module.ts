import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { GroupModel } from './group.model';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupProductModel } from './group-product.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([GroupModel, GroupProductModel]),
  ],
  providers: [GroupsService],
  exports: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
