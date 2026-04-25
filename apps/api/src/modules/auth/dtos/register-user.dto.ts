import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator"

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @IsString()
  @IsNotEmpty()
  password!: string
}
