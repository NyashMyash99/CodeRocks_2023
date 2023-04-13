import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import * as process from "process";

(async () => {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");
    app.use(helmet());
    app.use(cookieParser());
    app.enableCors({
      origin: process.env.FRONTEND_URL || "*",
      credentials: true,
      exposedHeaders: "X-Access-Token",
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    SwaggerModule.setup(
      "api/docs",
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle("Code-rocks documentation")
          .setVersion("1.0.0")
          .addBearerAuth()
          .build(),
      ),
    );

    await app.listen(process.env.API_PORT || 5200);
  } catch (e: any) {
    Logger.error(
      `Something went wrong when starting application: ${e.message}`,
    );
  }
})();
