import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { TokensService } from "../tokens/tokens.service";
import { UsersService } from "../users/users.service";
import { AuthorizationDto } from "./dao/authorization.dto";
import { TokensDto } from "../tokens/dao/token.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async signUp(authorizationData: AuthorizationDto): Promise<TokensDto> {
    const { id: userId } = await this.usersService.create(authorizationData);

    return this.tokensService.generateTokens({ userId });
  }

  async signIn(authorizationData: AuthorizationDto): Promise<TokensDto> {
    const { email, password } = authorizationData;
    const user = await this.usersService.findByEmail(email, { password: true });

    if (!user)
      throw new NotFoundException(
        "Пользователь с данными авторизационными данными не найден",
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException("Пароль введён неверно");

    return this.tokensService.generateTokens({ userId: user.id });
  }
}
