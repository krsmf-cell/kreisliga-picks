import {
  IsEnum,
  IsInt,
} from "class-validator";

import { PredictionChoice } from "../enums/prediction-choice.enum";

export class CreatePredictionDto {

  @IsInt()
  matchId!: number;

  @IsEnum(PredictionChoice)
  choice!: PredictionChoice;
}