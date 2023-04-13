import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { TokensModule } from "../tokens/tokens.module";
import { UsersModule } from "../users/users.module";
import configuration from "../config/configuration";
import { ConfigModule } from "@nestjs/config";
import { RefreshTokenMiddleware } from "./middlewares/refresh-token.middleware";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    TokensModule,
    UsersModule,
    OrdersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).forRoutes("*");
  }
}
