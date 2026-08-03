import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateMatchDto {

  @IsInt()
  matchdayId!: number;

  @IsInt()
  homeTeamId!: number;

  @IsInt()
  awayTeamId!: number;

  @IsDateString()
  kickoff!: string;

  @IsInt()
  homeGoals!: number;

  @IsInt()
  awayGoals!: number;

  @IsString()
  status!: string;

  @IsOptional()
  @IsString()
  location?: string;

  // ============================
  // Quoten
  // ============================

  @IsNumber()
  homeOdds!: number;

  @IsNumber()
  drawOdds!: number;

  @IsNumber()
  awayOdds!: number;

}