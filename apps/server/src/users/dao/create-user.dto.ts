import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  password: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    nullable: true,
    required: false,
  })
  phoneNumber?: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
