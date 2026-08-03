import {
  IsEnum,
  IsOptional,
} from "class-validator";

import { PredictionChoice } from "../enums/prediction-choice.enum";

export class UpdatePredictionDto {

  @IsOptional()
  @IsEnum(PredictionChoice)
  choice?: PredictionChoice;
}