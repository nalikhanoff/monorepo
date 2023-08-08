import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production', '.env.development'],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        BACKEND_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_VALID_DAYS: Joi.number().required(),
      }),
      expandVariables: true,
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
