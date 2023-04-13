import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dao/create-user.dto";
import { UpdateUserDto } from "./dao/update-user.dto";

const DEFAULT_PROFILE_SELECT_FIELDS: Prisma.ProfileSelect = {
  id: true,
  firstName: true,
  lastName: true,
  description: true,
};

export const DEFAULT_USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  email: true,
  profile: {
    select: DEFAULT_PROFILE_SELECT_FIELDS,
  },
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(
    email: string,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    return this.prismaService.user.findFirst({
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
      where: { email },
    });
  }

  public async findByID(
    userId: string,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    return this.prismaService.user.findFirst({
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
      where: { id: userId },
    });
  }

  async create(
    createUserDto: CreateUserDto,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    const { password, ...otherUserData } = createUserDto;
    const { email } = createUserDto;

    if (!!(await this.findByEmail(email)))
      throw new ForbiddenException("Пользователь с такой почтой не найден");

    return await this.prismaService.user.create({
      data: {
        ...otherUserData,
        password: await bcrypt.hash(password, 12),
        profile: {
          create: {
            firstName: null,
            lastName: null,
          },
        },
      },
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    const { firstName, lastName, description, ...otherData } = updateUserDto;

    try {
      return this.prismaService.user.update({
        where: { id },
        data: {
          ...otherData,
          profile: {
            update: {
              firstName,
              lastName,
              description,
            },
          },
        },
        select: {
          ...DEFAULT_USER_SELECT_FIELDS,
          ...additionalUserSelectFields,
        },
      });
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException();
    }
  }
}
