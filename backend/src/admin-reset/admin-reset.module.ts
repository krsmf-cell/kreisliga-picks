import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Match } from "../matches/entities/match.entity";
import { Prediction } from "../predictions/entities/prediction.entity";
import { PredictionFixture } from "../prediction-league/entities/prediction-fixture.entity";
import { Team } from "../teams/entities/team.entity";

import { AdminResetController } from "./admin-reset.controller";
import { AdminResetService } from "./admin-reset.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Match,
      Prediction,
      PredictionFixture,
      Team,
    ]),
  ],
  controllers: [
    AdminResetController,
  ],
  providers: [
    AdminResetService,
  ],
})
export class AdminResetModule {}