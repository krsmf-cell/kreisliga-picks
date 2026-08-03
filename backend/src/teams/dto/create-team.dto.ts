import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTeamDto {

  @IsString()
  name!: string;

  @IsString()
  shortName!: string;

  @IsInt()
  leagueId!: number;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}