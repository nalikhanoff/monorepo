import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getUser(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
