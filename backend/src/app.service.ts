import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getUser(login: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        login,
        deletedAt: null,
      },
    });
  }

  deleteUser(login: string) {
    return this.prisma.user.delete({
      where: { login },
    });
  }
}
