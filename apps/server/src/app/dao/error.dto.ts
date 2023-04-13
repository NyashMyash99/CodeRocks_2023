import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ nullable: false })
  message: string;

  @ApiProperty({ nullable: false })
  statusCode: number;
}

export class ValidationErrorDto {
  @ApiProperty({ nullable: false })
  message: [string];

  @ApiProperty({ nullable: false })
  error: string;

  @ApiProperty({ nullable: false })
  statusCode: number;
}
