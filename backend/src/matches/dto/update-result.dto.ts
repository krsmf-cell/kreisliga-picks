import { IsInt } from "class-validator";

export class UpdateResultDto {

  @IsInt()
  homeGoals!: number;

  @IsInt()
  awayGoals!: number;

}