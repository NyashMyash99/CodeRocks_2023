import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ProfileDto } from "./profile.dto";

export class FindUserDto {
  @ApiProperty({
    description: "User ID",
    nullable: false,
  })
  id: string;

  @ApiProperty({ nullable: false })
  email: string;

  @Type(() => ProfileDto)
  @ApiProperty({
    description: "User descriptive information",
    nullable: true,
  })
  profile: ProfileDto;

  constructor(partial: Partial<FindUserDto>) {
    Object.assign(this, partial);
  }
}

export class FindMeDto extends FindUserDto {
  @ApiProperty({ nullable: true })
  phoneNumber: string;

  constructor(partial: Partial<FindMeDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
