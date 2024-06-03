import { BaseRepository } from 'src/base/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaDatabase } from 'src/database/prisma.database';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(private prisma: PrismaDatabase) {
    super(prisma.product);
  }
}
