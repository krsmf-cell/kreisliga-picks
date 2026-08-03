import { Injectable } from "@nestjs/common";

@Injectable()
export class OddsService {

  calculate(
    home: number,
    draw: number,
    away: number,
  ) {

    return {

      homeOdds:
        Number((100 / home).toFixed(2)),

      drawOdds:
        Number((100 / draw).toFixed(2)),

      awayOdds:
        Number((100 / away).toFixed(2)),

    };

  }

}