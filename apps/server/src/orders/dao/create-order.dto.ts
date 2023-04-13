import { IsEnum, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "@prisma/client";

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  description: string;

  @IsPositive()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  minPrice: number;

  @IsPositive()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  maxPrice: number;

  @IsEnum(Currency)
  @ApiProperty({
    nullable: false,
    required: true,
  })
  currency: Currency;

  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  location: string;

  @IsPositive()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  deadline: number;

  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, partial);
  }
}
