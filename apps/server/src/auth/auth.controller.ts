import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { TokensService } from "../tokens/tokens.service";
import { AuthorizationDto } from "./dao/authorization.dto";
import { TokenDto } from "../tokens/dao/token.dto";
import { ErrorDto, ValidationErrorDto } from "../app/dao/error.dto";
import { UsersService } from "../users/users.service";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(TokenInterceptor)
export class AuthController {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Authorizes a user" })
  @ApiBody({ type: AuthorizationDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Success",
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Пользователь с такой почтой не найден",
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Data wasn't validated",
    type: ValidationErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Пользователь с данными авторизационными данными не найден",
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Пароль введён неверно",
    type: ErrorDto,
  })
  async auth(@Body() authorizationDto: AuthorizationDto): Promise<TokenDto> {
    const user = await this.usersService.findByEmail(authorizationDto.email);

    if (!user) return this.authService.signUp(authorizationDto);

    return this.authService.signIn(authorizationDto);
  }
}
