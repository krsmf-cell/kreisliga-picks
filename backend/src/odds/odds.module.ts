import { Module } from "@nestjs/common";

import { OddsService } from "./odds.service";

@Module({
  providers: [OddsService],
  exports: [OddsService],
})
export class OddsModule {}