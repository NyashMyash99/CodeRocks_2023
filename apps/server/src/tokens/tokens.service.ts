import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { JwtPayloadDto, TokensDto } from "./dao/token.dto";

@Injectable()
export class TokensService {
  private readonly jwt_secret;
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwt_secret = this.configService.get("jwt_secret");
  }

  public generateTokens(payload: JwtPayloadDto): TokensDto {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwt_secret,
        expiresIn: "15m",
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.jwt_secret,
        expiresIn: "7d",
      }),
    };
  }

  public refreshToken(refreshToken: TokensDto["refresh_token"]): TokensDto {
    if (!refreshToken)
      throw new UnauthorizedException("Refresh token not specified");

    let decodedData: JwtPayloadDto;
    try {
      decodedData = this.verifyToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedException("Refresh token invalid");
    }

    return this.generateTokens({
      userId: decodedData.userId,
    });
  }

  public verifyToken(token: string): JwtPayloadDto | any {
    return this.jwtService.verify(token, {
      secret: this.jwt_secret,
    });
  }

  public setupTokenCookie(
    refreshToken: TokensDto["refresh_token"],
    response: Response,
  ): void {
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
