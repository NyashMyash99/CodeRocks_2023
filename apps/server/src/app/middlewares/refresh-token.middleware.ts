import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TokensService } from "../../tokens/tokens.service";
import { TokensDto } from "../../tokens/dao/token.dto";

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokensService: TokensService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return next();

    const access_token = authHeader.slice(7);

    try {
      request.user = this.tokensService.verifyToken(access_token);
      return next();
    } catch (error: any) {
      if (error.name !== "TokenExpiredError")
        throw new UnauthorizedException("Access token invalid");
    }

    let updatedTokens: TokensDto;
    try {
      const refreshToken = request.cookies
        ? request.cookies["refresh_token"]
        : undefined;

      updatedTokens = this.tokensService.refreshToken(refreshToken);
    } catch (refreshError: any) {
      throw new UnauthorizedException(refreshError.message);
    }

    request.user = this.tokensService.verifyToken(updatedTokens.access_token);
    request.headers.authorization = `Bearer ${updatedTokens.access_token}`;

    this.tokensService.setupTokenCookie(updatedTokens.refresh_token, response);
    response.setHeader("X-Access-Token", updatedTokens.access_token);
    next();
  }
}
