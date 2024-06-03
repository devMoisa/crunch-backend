import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { mapObjectsOfArrays } from 'src/utils/mapObjectsOfArrays';
import { DeleteProductDTO } from './dto/delete-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async getAll(dto: GetAllProductsDTO) {
    try {
      let data = await this.repository.getAll(dto.pageNumber, dto.pageSize, {
        userId: dto.userId,
      });

      const mappedList = mapObjectsOfArrays(data.items, [
        'deleted',
        'createdAt',
        'updatedAt',
      ]);

      data.items = mappedList;

      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

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

  async softDelete(dto: DeleteProductDTO) {
    try {
      const data = await this.repository.getById(dto.productId);

      if (data.deleted) {
        return {
          message: 'This product has been already deleted.',
        };
      }

      if (dto.userId !== data.userId) {
        throw new HttpException(
          'You do not have permission to delete items belonging to another user.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.repository.delete(dto.productId);

      return {
        message: 'product deleted with success',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
