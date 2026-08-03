import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { League } from './entities/league.entity';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';

@Module({
  imports: [TypeOrmModule.forFeature([League])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}