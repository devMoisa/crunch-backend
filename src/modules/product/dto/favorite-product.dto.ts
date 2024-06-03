import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class FavoriteProductDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    required: false,
  })
  id?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product Name',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Shopify ID for the product',
    example: 'gid://shopify/Product/1234567890',
    required: true,
  })
  idShopify: string;

  @IsOptional()
  @ApiProperty({
    description: 'Product creation date',
    example: new Date(),
    required: false,
  })
  createdAt?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indicates if the product is deleted',
    example: false,
    required: false,
  })
  deleted?: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'Product last update date',
    example: new Date(),
    required: false,
  })
  updatedAt?: Date;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the user who saved the product',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    required: true,
  })
  userId: string;
}
