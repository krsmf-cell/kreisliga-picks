import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { LeaguesModule } from './leagues/leagues.module';
import { SeasonsModule } from './seasons/seasons.module';
import { MatchdaysModule } from './matchdays/matchdays.module';
import { MatchesModule } from './matches/matches.module';
import { PredictionsModule } from './predictions/predictions.module';
import { StandingsModule } from "./standings/standings.module";
import { AdminModule } from "./admin/admin.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { UploadModule } from "./upload/upload.module";
import { PredictionEngineModule } from "./prediction-engine/prediction-engine.module";
import { PredictionLeagueModule } from "./prediction-league/prediction-league.module";
import { AdminResetModule } from "./admin-reset/admin-reset.module";
import { ImportsModule } from "./imports/imports.module";


@Module({
  imports: [
  ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: "./.env",
}),

TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: "postgres",

    host: config.get("DB_HOST"),
    port: Number(config.get("DB_PORT")),
    username: config.get("DB_USERNAME"),
    password: config.get("DB_PASSWORD"),
    database: config.get("DB_DATABASE"),

    autoLoadEntities: true,
    synchronize: true,

    ssl: false,
  }),
}),
  UsersModule,

  AuthModule,

  TeamsModule,

  LeaguesModule,

  SeasonsModule,

  MatchdaysModule,

  MatchesModule,

  PredictionsModule,

  StandingsModule,

  StatisticsModule,

  AdminModule,

  PredictionEngineModule,

  PredictionLeagueModule,

  UploadModule,

  AdminResetModule,

  ImportsModule

],
})
export class AppModule {}
