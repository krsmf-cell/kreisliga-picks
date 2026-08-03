import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Prediction } from "./entities/prediction.entity";
import { PredictionsController } from "./predictions.controller";
import { PredictionsService } from "./predictions.service";

import { Match } from "../matches/entities/match.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prediction,
      Match,
      User,
    ]),
  ],
  controllers: [PredictionsController],
  providers: [PredictionsService],
  exports: [PredictionsService],
})
export class PredictionsModule {}