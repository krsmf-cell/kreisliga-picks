import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Team } from "../teams/entities/team.entity";
import { Match } from "../matches/entities/match.entity";
import { PredictionEngineService } from "./prediction-engine.service";
import { PredictionEngineController } from "./prediction-engine.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      Match,
    ]),
  ],
  providers: [
    PredictionEngineService,
  ],
  exports: [
    PredictionEngineService,
  ],
controllers:[
PredictionEngineController,
],

})
export class PredictionEngineModule {}