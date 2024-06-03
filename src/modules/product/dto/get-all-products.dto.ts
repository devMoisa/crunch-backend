import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class GetAllProductsDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: true, type: 'number' })
  pageNumber: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: true, type: 'number' })
  pageSize: number;

  @Type(() => String)
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  userId: string;
}
