import { Prisma } from '@prisma/client';

export const clearSeeds = async ({ client }) => {
  const modelNames = Prisma.dmmf.datamodel.models.map((m) => {
    return m.dbName ?? m.name;
  });
  for (const modelName of modelNames) {
    await client.$queryRawUnsafe(`TRUNCATE TABLE "${modelName}" CASCADE`);
  }
};
