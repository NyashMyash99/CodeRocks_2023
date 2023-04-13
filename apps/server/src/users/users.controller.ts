import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dao/update-user.dto";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { FindMeDto, FindUserDto } from "./dao/find-user.dto";
import { CurrentUser } from "../app/decorators/current-user.decorator";
import { castToEntity } from "../utils/helpers/type.helpers";
import { JwtPayloadDto } from "../tokens/dao/token.dto";
import { ErrorDto, ValidationErrorDto } from "../app/dao/error.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: FindMeDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Authorization failed",
    type: ErrorDto,
  })
  async findMe(@CurrentUser() user: JwtPayloadDto) {
    return castToEntity(
      await this.usersService.findByID(user.userId, {
        phoneNumber: true,
      }),
      FindMeDto,
    );
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: FindUserDto,
  })
  async find(@Param("id") id: string) {
    return castToEntity(await this.usersService.findByID(id), FindUserDto);
  }

  @Put(":id")
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Success",
    type: FindUserDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Authorization failed",
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "У вас нет доступа к этому пользователю",
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Data wasn't validated",
    type: ValidationErrorDto,
  })
  async update(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    this.compareUsers(userId, user);

    return castToEntity(
      await this.usersService.update(userId, updateUserDto),
      FindUserDto,
    );
  }

  /**
   * Compares provided profile id with data from access token.
   * @param userId Provided id param
   * @param user User data from access token
   * @throws HttpException
   */
  compareUsers = (userId: string, user: JwtPayloadDto) => {
    if (userId !== user.userId)
      throw new ForbiddenException("У вас нет доступа к этому пользователю");
  };
}
