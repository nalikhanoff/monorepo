import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  unit: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImage)
  productImages: ProductImage[];
}

export class ProductImage {
  @IsBoolean()
  isMainImage: boolean;

  @IsUrl()
  url: string;
}
