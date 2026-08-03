import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";

import { TeamStatistics } from "./entities/team-statistics.entity";

import { Team } from "../teams/entities/team.entity";
import { Match } from "../matches/entities/match.entity";
import { Season } from "../seasons/entities/season.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamStatistics,
      Team,
      Match,
      Season,
    ]),
  ],
  controllers: [
    StatisticsController,
  ],
  providers: [
    StatisticsService,
  ],
  exports: [
    StatisticsService,
  ],
})
export class StatisticsModule {}