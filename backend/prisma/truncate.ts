import { PrismaClient } from '@prisma/client';

import { clearSeeds } from './seeders/clearSeeds';

const prisma = new PrismaClient();

clearSeeds({ client: prisma })
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('error during db seed via prisma', e);
    await prisma.$disconnect();
    process.exit(1);
  });
