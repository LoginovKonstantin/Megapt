import { ProductModel } from '../product.model';
import { ProductDto } from './product.dto';

export class ProductsMapper {
  static toDto(product: ProductModel): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      producer: product.producer,
    };
  }
}
