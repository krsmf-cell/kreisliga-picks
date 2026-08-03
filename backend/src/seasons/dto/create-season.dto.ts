import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsString,
} from "class-validator";

export class CreateSeasonDto {

  @IsString()
  name!: string;

  @IsInt()
  leagueId!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsBoolean()
  active!: boolean;
}