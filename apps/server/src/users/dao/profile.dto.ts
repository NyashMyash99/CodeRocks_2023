import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class ProfileDto implements Prisma.ProfileUncheckedCreateInput {
  @ApiProperty({
    description: "User profile ID",
    nullable: false,
  })
  id: string;

  @ApiProperty({ nullable: true })
  firstName: string;

  @ApiProperty({ nullable: true })
  lastName: string;

  @ApiProperty({ nullable: true })
  description: string;

  @Exclude()
  @ApiProperty({
    description: "Related user ID",
    nullable: true,
  })
  userId: string;

  constructor(partial: Partial<ProfileDto>) {
    Object.assign(this, partial);
  }
}
