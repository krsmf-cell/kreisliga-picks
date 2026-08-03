import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionsModule } from "../predictions/predictions.module";
import { Match } from './entities/match.entity';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Team } from 'src/teams/entities/team.entity';
import { Matchday } from 'src/matchdays/entities/matchday.entity';
import { PredictionEngineModule } from "../prediction-engine/prediction-engine.module";
import { PredictionLeagueModule } from "../prediction-league/prediction-league.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Match,
      Matchday,
      Team,
    ]),
    PredictionsModule,
    PredictionEngineModule,
    PredictionLeagueModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}