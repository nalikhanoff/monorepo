import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/user/public.decorator';
import { CreateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  listProducts() {
    return this.productService.listProducts();
  }

  @Public()
  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
