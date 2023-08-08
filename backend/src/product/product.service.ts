import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
