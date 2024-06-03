import { Product } from '@prisma/client';
import { BaseEntity } from 'src/base/base.entity';

export class ProductEntity extends BaseEntity {
  name: string;
  userId: string;
  idShopify: string;
}
