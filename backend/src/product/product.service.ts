import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, ProductDto } from './product.dto';

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
          orderBy: {
            isMainImage: 'desc',
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
            isMainImage: 'desc',
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

  async update(dto: ProductDto) {
    await this.prismaService.productImage.deleteMany({
      where: { productId: dto.id },
    });

    if (dto.productImages.length) {
      await Promise.all(
        dto.productImages.map((img) => {
          return this.prismaService.productImage.upsert({
            where: {
              productId_url: {
                productId: dto.id,
                url: img.url,
              },
            },
            create: {
              productId: dto.id,
              url: img.url,
              isMainImage: img.isMainImage,
            },
            update: {
              productId: dto.id,
              url: img.url,
              isMainImage: img.isMainImage,
              deletedAt: null,
            },
          });
        }),
      );
    }

    return this.prismaService.product.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        unit: dto.unit,
      },
    });
  }

  async delete(id: number) {
    console.log(id);
    await this.prismaService.productImage.deleteMany({
      where: { productId: id },
    });

    return this.prismaService.product.delete({ where: { id } });
  }
}
