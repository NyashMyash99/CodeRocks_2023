import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({ nullable: false })
  access_token: string;

  constructor(partial: Partial<TokenDto>) {
    Object.assign(this, partial);
  }
}

export class TokensDto extends TokenDto {
  @ApiProperty({ nullable: false })
  refresh_token: string;

  constructor(partial: Partial<TokensDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class JwtPayloadDto {
  userId: string;
}
