import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthorizationDto {
  @IsEmail()
  @ApiProperty({ nullable: false, required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false, required: true })
  password: string;

  constructor(partial: Partial<AuthorizationDto>) {
    Object.assign(this, partial);
  }
}
