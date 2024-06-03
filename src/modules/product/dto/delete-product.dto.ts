import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteProductDTO {
  @Type(() => String)
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  productId: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  userId: string;
}
