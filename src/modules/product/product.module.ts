import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { PrismaDatabase } from 'src/database/prisma.database';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaDatabase],
})
export class ProductModule {}
