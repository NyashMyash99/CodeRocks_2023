import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dao/create-order.dto";
import { CurrentUser } from "../app/decorators/current-user.decorator";
import { JwtPayloadDto } from "../tokens/dao/token.dto";
import { castToEntity } from "../utils/helpers/type.helpers";
import { FindOrderDto } from "./dao/find-order.dto";
import { JwtGuard } from "../auth/guards/jwt.guard";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return castToEntity(
      await this.ordersService.create(user.userId, createOrderDto),
      FindOrderDto,
    );
  }

  @Post(":id/subscribe")
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async subscribe(@Param("id") id: string, @CurrentUser() user: JwtPayloadDto) {
    return castToEntity(
      await this.ordersService.subscribe(user.userId, id),
      FindOrderDto,
    );
  }

  @Get("list")
  async list() {
    return await this.ordersService.getAll();
  }
}
