import { Injectable } from "@nestjs/common";

@Injectable()
export class OddsService {

  calculate(
    homePoints: number,
    awayPoints: number,
  ) {

    const diff = homePoints - awayPoints;

    let homeChance = 50;

    homeChance += diff * 1.5;

    homeChance = Math.max(
      15,
      Math.min(75, homeChance),
    );

    const drawChance = 22;

    const awayChance =
      100 - homeChance - drawChance;

    return {

      homeOdds: Number(
        (100 / homeChance).toFixed(2),
      ),

      drawOdds: Number(
        (100 / drawChance).toFixed(2),
      ),

      awayOdds: Number(
        (100 / awayChance).toFixed(2),
      ),
    };
  }
}