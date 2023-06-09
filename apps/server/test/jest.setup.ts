import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { seedData } from './utils/seedData';

export let httpClient: request.SuperAgentTest;
export let app: INestApplication;

global.beforeAll(async () => {
  try {
    const testModule: TestingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    const moduleRef: TestingModule = await testModule.compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();

    httpClient = request.agent(app.getHttpServer());
  } catch (err) {
    console.error('<!Jest setup error>\n', err);
  }
});

global.afterAll(async () => {
  await app.close();
});

global.beforeEach(async () => {
  const prisma: PrismaService = app.get<PrismaService>(PrismaService);

  await seedData(prisma);
});
