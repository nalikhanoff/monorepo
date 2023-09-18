import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  unit: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  productImages: CreateProductImageDto[];
}

export class CreateProductImageDto {
  @IsBoolean()
  isMainImage: boolean;

  @IsUrl()
  url: string;
}

export class ProductImageDto extends CreateProductImageDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class ProductDto extends CreateProductDto {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  productImages: ProductImageDto[];
}
