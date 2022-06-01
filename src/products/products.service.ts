import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './product.model';
import { ProductsMapper, ProductDto } from './dtos';
import { Exceptions } from '../exceptions';
import {
  ProductCreateOptions,
  ProductDeleteOptions,
  ProductEditOptions,
  ProductGetAllOptions,
  ProductGetOneOptions,
  ProductToGroupOptions,
} from './interfaces';
import { GroupModel } from '../groups/group.model';
import { GroupProductModel } from '../groups/group-product.model';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
    @InjectModel(GroupModel) private groupModel: typeof GroupModel,
    @InjectModel(GroupProductModel)
    private groupProductModel: typeof GroupProductModel,
  ) {}

  async getOne(options: ProductGetOneOptions): Promise<ProductDto | null> {
    const product = await this.productModel.findByPk(options.id);
    return product ? ProductsMapper.toDto(product) : null;
  }

  async getAll(
    options: ProductGetAllOptions,
  ): Promise<{ items: ProductDto[]; count: number }> {
    const products = await this.productModel.findAndCountAll({
      limit: options.limit || 50,
      offset: options.offset || 0,
    });

    return {
      items: products.rows.map(ProductsMapper.toDto),
      count: products.count,
    };
  }

  async create(options: ProductCreateOptions): Promise<ProductDto> {
    this.logger.log(`Create product ${JSON.stringify(options)}`);

    await this.checkProductByName(options.name);

    return this.productModel.create({ ...options }).then(ProductsMapper.toDto);
  }

  async edit(options: ProductEditOptions): Promise<ProductDto> {
    this.logger.log(`Edit product ${JSON.stringify(options)}`);
    const { id, name, description, producer } = options;
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw Exceptions.getNotFoundException(
        `Product with id <${id}> not found`,
      );
    }

    if (name && product.name !== name) {
      await this.checkProductByName(name);
      product.set('name', name);
    }

    if (description && product.description !== description) {
      product.set('description', description);
    }

    if (producer && product.producer !== producer) {
      product.set('name', producer);
    }

    if (product.changed()) {
      this.logger.log(`Product <${id}> has changed`);

      await product.save();
      await product.reload();
    }

    return ProductsMapper.toDto(product);
  }

  async addToGroup(options: ProductToGroupOptions): Promise<void> {
    this.logger.log(`Add product to group ${JSON.stringify(options)}`);
    const { productId, groupId } = options;

    const product = await this.productModel.findByPk(productId);

    if (!product) {
      throw Exceptions.getNotFoundException(
        `Product with id <${productId}> not found`,
      );
    }

    const group = await this.groupModel.findByPk(groupId);

    if (!group) {
      throw Exceptions.getNotFoundException(
        `Group with id <${groupId}> not found`,
      );
    }

    const existProductInGroup = await this.groupProductModel.findOne({
      where: {
        productId,
        groupId,
      },
    });

    if (existProductInGroup) {
      throw Exceptions.getConflictException('Product already exist in group');
    }

    const groupProduct = await this.groupModel.findOne({
      where: { parentId: group.id },
    });

    if (groupProduct) {
      throw Exceptions.getConflictException(
        `Group with id <${groupId}> contains another group`,
      );
    }

    await this.groupProductModel.create({ productId, groupId });
  }

  async delete(options: ProductDeleteOptions): Promise<void> {
    this.logger.log(`Delete product ${JSON.stringify(options)}`);
    const id = options.id;
    await this.groupProductModel.destroy({ where: { productId: id } });
    await this.productModel.destroy({ where: { id } });
  }

  private async checkProductByName(name: string): Promise<void> {
    const product = await this.productModel.findOne({
      where: { name },
    });

    if (product) {
      throw Exceptions.getConflictException(
        `Product with same name has already exist <${name}>`,
      );
    }
  }
}
