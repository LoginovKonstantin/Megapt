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
import { ProductsService } from './products.service';
import { ProductDto, ProductsDto } from './dtos';
import {
  ProductCreateOptions,
  ProductDeleteOptions,
  ProductEditOptions,
  ProductGetAllOptions,
  ProductGetOneOptions, ProductToGroupOptions
} from "./interfaces";

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({
    description: 'Get product by id',
    type: ProductDto,
  })
  @Get(':id')
  async getOne(@Param() options: ProductGetOneOptions): Promise<ProductDto> {
    return this.productsService.getOne(options);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'Get all products',
    type: ProductsDto,
  })
  @Get(':limit/:offset')
  async getAll(
    @Param() options: ProductGetAllOptions,
  ): Promise<{ items: ProductDto[]; count: number }> {
    return this.productsService.getAll(options);
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiConflictResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Product with same name has already exist',
          },
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'Product successful created',
    type: ProductDto,
  })
  @Post('')
  async create(@Body() options: ProductCreateOptions): Promise<ProductDto> {
    return this.productsService.create(options);
  }

  @ApiOperation({ summary: 'Add product to group' })
  @ApiNotFoundResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product with id <${id}> not found',
          },
        },
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
            message: 'Group with id <${groupId}> contains another group',
          },
        },
        {
          example: {
            statusCode: HttpStatus.CONFLICT,
            message: 'Product already exist in group',
          },
        },
      ],
    },
  })
  @Post('add-to-group')
  async addToGroup(@Body() options: ProductToGroupOptions): Promise<void> {
    return this.productsService.addToGroup(options);
  }

  @ApiOperation({ summary: 'Edit product' })
  @ApiNotFoundResponse({
    schema: {
      anyOf: [
        {
          example: {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product with id <${id}> not found',
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
            message: 'Product with same name has already exist',
          },
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'Product successful changed',
    type: ProductEditOptions,
  })
  @Put('')
  async edit(@Body() options: ProductEditOptions): Promise<ProductDto> {
    return this.productsService.edit(options);
  }

  @ApiOperation({ summary: 'Delete product' })
  @Delete(':id')
  async delete(@Param() options: ProductDeleteOptions): Promise<void> {
    await this.productsService.delete(options);
  }
}
