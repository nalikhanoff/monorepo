import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(this.softDeleteMiddleware);
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  softDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    const model = Prisma.dmmf.datamodel.models.find(
      (model) => model.name === params.model,
    );
    if (
      model?.fields?.find(
        (field) => field.name === 'deletedAt' && !params?.args?.force,
      )
    ) {
      if (params.action === 'delete') {
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }

      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }
    }

    if (params?.args?.force) delete params.args.force;

    return next(params);
  };
}
