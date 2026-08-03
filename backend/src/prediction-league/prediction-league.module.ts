import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PredictionLeagueController } from "./prediction-league.controller";
import { PredictionLeagueService } from "./prediction-league.service";
import { PredictionLeagueTableService } from "./services/prediction-league-table.service";
import { PredictionFixture } from "./entities/prediction-fixture.entity";
import { PredictionStanding } from "./entities/prediction-standing.entity";
import { RoundRobinService } from "./services/round-robin.service";
import { User } from "../users/entities/user.entity";
import { Season } from "../seasons/entities/season.entity";
import { Matchday } from "../matchdays/entities/matchday.entity";
import { Prediction } from "../predictions/entities/prediction.entity";
import { PredictionTable } from "../prediction-league/entities/prediction-table.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PredictionFixture,
      PredictionStanding,
      PredictionTable,
      User,
      Season,
      Matchday,
      Prediction,
    ]),
  ],
  controllers: [
    PredictionLeagueController,
  ],
  providers: [
    PredictionLeagueService,
    RoundRobinService,
    PredictionLeagueTableService,
  ],
  exports: [
    PredictionLeagueService,
  ],
})
export class PredictionLeagueModule {}