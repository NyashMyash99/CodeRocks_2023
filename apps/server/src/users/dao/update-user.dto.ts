import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  password?: string;

  @IsPhoneNumber("RU")
  @IsOptional()
  @ApiProperty({
    nullable: true,
    required: false,
  })
  phoneNumber?: string;

  @IsNotEmpty()
  @ApiProperty({
    nullable: true,
    required: false,
  })
  firstName?: string;

  @IsNotEmpty()
  @ApiProperty({
    nullable: true,
    required: false,
  })
  lastName?: string;

  @IsNotEmpty()
  @ApiProperty({
    nullable: true,
    required: false,
  })
  description?: string;

  constructor(partial: Partial<UpdateUserDto>) {
    Object.assign(this, partial);
  }
}
