import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dao/create-order.dto";
import { DEFAULT_USER_SELECT_FIELDS } from "../users/users.service";

const DEFAULT_ORDER_SELECT_FIELDS: Prisma.OrderSelect = {
  id: true,
  title: true,
  description: true,
  minPrice: true,
  maxPrice: true,
  currency: true,
  deadline: true,
  location: true,
  customer: {
    select: DEFAULT_USER_SELECT_FIELDS,
  },
  performers: {
    select: DEFAULT_USER_SELECT_FIELDS,
  },
};

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    createOrderDto: CreateOrderDto,
    additionalOrderSelectFields: Prisma.OrderSelect = {},
  ) {
    return this.prismaService.order.create({
      data: {
        ...createOrderDto,
        customerId: userId,
      },
      select: {
        ...DEFAULT_ORDER_SELECT_FIELDS,
        ...additionalOrderSelectFields,
      },
    });
  }

  async subscribe(userId: string, orderId: string) {
    return this.prismaService.order.update({
      where: { id: orderId },
      data: {
        performers: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getAll(additionalOrderSelectFields: Prisma.OrderSelect = {}) {
    return this.prismaService.order.findMany({
      select: {
        ...DEFAULT_ORDER_SELECT_FIELDS,
        ...additionalOrderSelectFields,
      },
    });
  }
}
