import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateTeamDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsOptional()
  @IsInt()
  leagueId?: number;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}