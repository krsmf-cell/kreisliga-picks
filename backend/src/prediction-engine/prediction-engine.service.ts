import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match } from "../matches/entities/match.entity";
import { Team } from "../teams/entities/team.entity";

export interface PredictionResult {

  homeChance: number;
  drawChance: number;
  awayChance: number;

  homeOdds: number;
  drawOdds: number;
  awayOdds: number;

  homePoints: number;
  drawPoints: number;
  awayPoints: number;

}
@Injectable()
export class PredictionEngineService {


  
  constructor(

    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,

    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,

  ) {}
  
  async updateRatings(
    match: Match,
  ) {

    const home = await this.teamRepo.findOne({
      where: {
        id: match.homeTeam.id,
      },
    });

    const away = await this.teamRepo.findOne({
      where: {
        id: match.awayTeam.id,
      },
    });

    if (!home || !away) {
      return;
    }

    const K = 20;

    const expectedHome =
      1 /
      (
        1 +
        Math.pow(
          10,
          (away.rating - home.rating) / 400,
        )
      );

    const expectedAway =
      1 - expectedHome;

    let scoreHome = 0.5;
    let scoreAway = 0.5;

    if (match.homeGoals > match.awayGoals) {

      scoreHome = 1;
      scoreAway = 0;

    } else if (
      match.homeGoals < match.awayGoals
    ) {

      scoreHome = 0;
      scoreAway = 1;

    }

    home.rating =
      Math.round(
        home.rating +
          K *
            (
              scoreHome -
              expectedHome
            ),
      );

    away.rating =
      Math.round(
        away.rating +
          K *
            (
              scoreAway -
              expectedAway
            ),
      );

    await this.teamRepo.save(home);
    await this.teamRepo.save(away);

  }

private pushForm(
  team: Team,
  result: "W" | "D" | "L",
) {

  const form = [...(team.lastFive ?? [])];

  form.push(result);

  while (form.length > 5) {
    form.shift();
  }

  team.lastFive = form;

}
private updateStreak(
  team: Team,
  result: "W" | "D" | "L",
) {

  if (result === "W") {

    if (team.currentStreak >= 0)
      team.currentStreak++;
    else
      team.currentStreak = 1;

  }

  else if (result === "L") {

    if (team.currentStreak <= 0)
      team.currentStreak--;
    else
      team.currentStreak = -1;

  }

  else {

    team.currentStreak = 0;

  }

}
async updateTeamStats(
  match: Match,
) {

  const home =
    await this.teamRepo.findOne({
      where: {
        id: match.homeTeam.id,
      },
    });

  const away =
    await this.teamRepo.findOne({
      where: {
        id: match.awayTeam.id,
      },
    });

  if (!home || !away) {
    return;
  }

  home.played++;
  away.played++;

  home.homePlayed++;
  away.awayPlayed++;

  home.goalsFor += match.homeGoals;
  home.goalsAgainst += match.awayGoals;

  away.goalsFor += match.awayGoals;
  away.goalsAgainst += match.homeGoals;

  home.goalDifference =
    home.goalsFor - home.goalsAgainst;

  away.goalDifference =
    away.goalsFor - away.goalsAgainst;

  if (match.homeGoals > match.awayGoals) {

    home.wins++;
    away.losses++;

    home.points += 3;

    home.homeWins++;

    this.pushForm(home, "W");
    this.pushForm(away, "L");

    this.updateStreak(home, "W");
    this.updateStreak(away, "L");

  }

  else if (match.homeGoals < match.awayGoals) {

    away.wins++;
    home.losses++;

    away.points += 3;

    away.awayWins++;

    this.pushForm(home, "L");
    this.pushForm(away, "W");

    this.updateStreak(home, "L");
    this.updateStreak(away, "W");

  }

  else {

    home.draws++;
    away.draws++;

    home.points++;
    away.points++;

    this.pushForm(home, "D");
    this.pushForm(away, "D");

    this.updateStreak(home, "D");
    this.updateStreak(away, "D");

  }

  await this.teamRepo.save(home);
  await this.teamRepo.save(away);

}




calculatePrediction(
  match: Match,
): PredictionResult {

  const homeRating =
  match.homeTeam.rating
  + this.getHomeBonus(match.homeTeam)
  + this.getFormBonus(match.homeTeam)
  + match.homeTeam.currentStreak * 5;

const awayRating =
  match.awayTeam.rating
  + this.getFormBonus(match.awayTeam)
  + match.awayTeam.currentStreak * 5
  + this.getAwayPenalty(match.awayTeam);

  const diff =
    homeRating - awayRating;

  // Elo-Wahrscheinlichkeit
  const expectedHome =
    1 /
    (
      1 +
      Math.pow(
        10,
        -diff / 400,
      )
    );

  const expectedAway =
    1 - expectedHome;

  // Remiswahrscheinlichkeit
  const drawChance =
    Math.max(
      0.15,
      0.30 - Math.abs(diff) / 1000,
    );

  const factor =
    expectedHome + expectedAway;

  const homeChance =
    (expectedHome / factor) *
    (1 - drawChance);

  const awayChance =
    (expectedAway / factor) *
    (1 - drawChance);

  const homePercent =
    Math.round(homeChance * 100);

  const drawPercent =
    Math.round(drawChance * 100);

  const awayPercent =
    100 -
    homePercent -
    drawPercent;

  const homeOdds =
    Number((100 / homePercent).toFixed(2));

  const drawOdds =
    Number((100 / drawPercent).toFixed(2));

  const awayOdds =
    Number((100 / awayPercent).toFixed(2));

  return {

    homeChance: homePercent,
    drawChance: drawPercent,
    awayChance: awayPercent,

    homeOdds,
    drawOdds,
    awayOdds,

    homePoints:
      this.getPoints(homePercent),

    drawPoints:
      this.getPoints(drawPercent),

    awayPoints:
      this.getPoints(awayPercent),

  };

}
private getPoints(
  probability: number,
): number {

  if (probability >= 70) return 2;

  if (probability >= 60) return 3;

  if (probability >= 50) return 5;

  if (probability >= 35) return 7;

  if (probability >= 30) return 8;

  if (probability >= 25) return 9;

  if (probability >= 20) return 10;

  return 15;

}

private getFormBonus(team: Team): number {

  if (!team.lastFive || team.lastFive.length === 0) {
    return 0;
  }

  let bonus = 0;

  for (const result of team.lastFive) {

    if (result === "W") bonus += 15;
    if (result === "D") bonus += 5;
    if (result === "L") bonus -= 10;

  }

  return bonus;
}

private getHomeBonus(team: Team): number {

  if (team.homePlayed === 0) {
    return 60;
  }

  const rate = team.homeWins / team.homePlayed;

  return Math.round(40 + rate * 40);
}

private getAwayPenalty(team: Team): number {

  if (team.awayPlayed === 0) {
    return 0;
  }

  const rate = team.awayWins / team.awayPlayed;

  return Math.round(rate * 20);
}

async predictMatch(
    matchId: number,
): Promise<PredictionResult> {

    const match =
        await this.matchRepo.findOne({

            where:{
                id:matchId,
            },

            relations:{
                homeTeam:true,
                awayTeam:true,
            },

        });

    if(!match){

        throw new Error(
            "Spiel nicht gefunden",
        );

    }

    return this.calculatePrediction(
        match,
    );

}
}