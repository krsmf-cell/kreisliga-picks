import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateMatchDto {

  @IsOptional()
  @IsInt()
  matchdayId?: number;

  @IsOptional()
  @IsInt()
  homeTeamId?: number;

  @IsOptional()
  @IsInt()
  awayTeamId?: number;

  @IsOptional()
  @IsDateString()
  kickoff?: string;

  @IsOptional()
  @IsInt()
  homeGoals?: number;

  @IsOptional()
  @IsInt()
  awayGoals?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  location?: string;

  // ============================
  // Quoten
  // ============================

  @IsOptional()
  @IsNumber()
  homeOdds?: number;

  @IsOptional()
  @IsNumber()
  drawOdds?: number;

  @IsOptional()
  @IsNumber()
  awayOdds?: number;

}