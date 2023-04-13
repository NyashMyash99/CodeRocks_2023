import { PrismaService } from 'src/prisma/prisma.service';
import { usersFixture } from '../fixtures/users';
import { profilesFixture } from '../fixtures/profiles';
import { User } from '@prisma/client';

export const seedData = async (prisma: PrismaService) => {
  // Disable foreign keys
  await prisma.$executeRawUnsafe(`SET session_replication_role = 'replica';`);

  // Cleanup database
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Seed users
  await prisma.user.createMany({
    data: usersFixture as User[],
  });

  // Seed profiles
  await prisma.profile.createMany({
    data: profilesFixture,
  });

  // Enable foreign keys
  await prisma.$executeRawUnsafe(`SET session_replication_role = 'origin';`);
};
