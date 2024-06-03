import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { FavoriteProductDto } from './dto/favorite-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async favorite(dto: FavoriteProductDto) {
    try {
      const existingProduct = await this.repository.findOne({
        name: dto.name,
        userId: dto.userId,
        idShopify: dto.idShopify,
      });

      if (existingProduct) {
        return;
      }

      await this.repository.create({
        name: dto.name,
        userId: dto.userId,
        idShopify: dto.idShopify,
      });

      return;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
