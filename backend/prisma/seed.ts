import { PrismaClient } from '@prisma/client';

import { clearSeeds } from './seeders/clearSeeds';
import { dbSeeds } from './seeders/dbSeeds';

const prisma = new PrismaClient();

const seedDb = async () => {
  // clear all data in db
  await clearSeeds({ client: prisma });

  for (const { modelName, data } of dbSeeds) {
    if (!prisma[modelName]) {
      throw new Error(`Prisma client doesn't have ${modelName} table`);
    }
    await prisma[modelName].createMany({ data });
  }
};

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('error during db seed via prisma', e);
    await prisma.$disconnect();
    process.exit(1);
  });
