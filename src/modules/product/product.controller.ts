import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { DeleteProductDTO } from './dto/delete-product.dto';

@Controller('/api')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/favorites')
  async getAll(@Query() dto: GetAllProductsDTO) {
    try {
      return await this.service.getAll(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/favorite')
  async favorite(@Body() dto: FavoriteProductDto) {
    try {
      return await this.service.favorite(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/favorite')
  async delete(@Query() dto: DeleteProductDTO) {
    try {
      return await this.service.softDelete(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
