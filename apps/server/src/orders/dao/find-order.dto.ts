import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "@prisma/client";

export class FindOrderDto {
  @ApiProperty({ nullable: false })
  id: string;

  @ApiProperty({ nullable: false })
  title: string;

  @ApiProperty({ nullable: false })
  description: string;

  @ApiProperty({ nullable: false })
  minPrice: number;

  @ApiProperty({ nullable: false })
  maxPrice: number;

  @ApiProperty({ nullable: false })
  currency: Currency;

  @ApiProperty({ nullable: false })
  location: string;

  @ApiProperty({ nullable: false })
  deadline: number;

  @ApiProperty({ nullable: false })
  customerId: string;

  @ApiProperty({ nullable: false })
  performers: string[];

  constructor(partial: Partial<FindOrderDto>) {
    Object.assign(this, partial);
  }
}
