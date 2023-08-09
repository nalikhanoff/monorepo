import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  listProducts() {
    return this.prismaService.product.findMany({
      where: { deletedAt: null },
      include: {
        productImages: {
          where: {
            deletedAt: null,
            isMainImage: true,
          },
          select: {
            url: true,
          },
        },
      },
    });
  }

  getProduct(id: number) {
    return this.prismaService.product.findFirst({
      where: { id },
      include: {
        productImages: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            isMainImage: 'asc',
          },
          select: {
            url: true,
            isMainImage: true,
          },
        },
      },
    });
  }

  create(dto: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        unit: dto.unit,
        ...(!!dto.productImages.length && {
          productImages: {
            createMany: {
              data: dto.productImages,
            },
          },
        }),
      },
    });
  }
}
