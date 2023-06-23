import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'ftd_ftd',
      type: 'postgresql',
      port: 5432,
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      entities: ['dist/**/**/*.entity.js'],
      entitiesTs: ['src/**/**/*.entity.ts'],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
