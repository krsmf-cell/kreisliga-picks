import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MatchdaysController } from "./matchdays.controller";
import { MatchdaysService } from "./matchdays.service";

import { Matchday } from "./entities/matchday.entity";
import { Season } from "../seasons/entities/season.entity";
import { Match } from "../matches/entities/match.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Matchday,
      Season,
      Match,  
    ]),
  ],
  controllers: [MatchdaysController],
  providers: [MatchdaysService],
  exports: [MatchdaysService],
})
export class MatchdaysModule {}