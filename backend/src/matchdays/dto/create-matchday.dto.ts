import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsEmail,
} from "class-validator";
export class CreateMatchdayDto {

  @IsInt()
  seasonId!: number;

  @IsInt()
  number!: number;

  @IsDateString()
  deadline!: string;

  @IsBoolean()
  active!: boolean;
}