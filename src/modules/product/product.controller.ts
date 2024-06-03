import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { FavoriteProductDto } from './dto/favorite-product.dto';

@Controller('/api')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('/favorite')
  async favorite(@Body() dto: FavoriteProductDto) {
    try {
      return await this.service.favorite(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
