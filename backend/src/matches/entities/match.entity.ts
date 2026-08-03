import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { Matchday } from "../../matchdays/entities/matchday.entity";
import { Team } from "../../teams/entities/team.entity";

export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  FINISHED = "finished",
  POSTPONED = "postponed",
  CANCELLED = "cancelled",
}

@Entity()
export class Match {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Matchday,
    (matchday) => matchday.matches,
    {
      eager: true,
    },
  )
  matchday!: Matchday;

  @ManyToOne(() => Team, {
    eager: true,
  })
  homeTeam!: Team;

  @ManyToOne(() => Team, {
    eager: true,
  })
  awayTeam!: Team;

  @Column({
    type: "timestamp",
  })
  kickoff!: Date;

  @Column({
    default: 0,
  })
  homeGoals!: number;

  @Column({
    default: 0,
  })
  awayGoals!: number;

  @Column({
    type: "enum",
    enum: MatchStatus,
    default: MatchStatus.SCHEDULED,
  })
  status!: MatchStatus;

  @Column({
    nullable: true,
  })
  location?: string;

  // ============================
  // Wettquoten
  // ============================

  @Column({
    type: "decimal",
    precision: 4,
    scale: 2,
    default: 1.50,
  })
  homeOdds!: number;

  @Column({
    type: "decimal",
    precision: 4,
    scale: 2,
    default: 4.00,
  })
  drawOdds!: number;

  @Column({
    type: "decimal",
    precision: 4,
    scale: 2,
    default: 6.00,
  })
  awayOdds!: number;

  // ============================
  // Tipp-Punkte
  // ============================

  @Column({
    default: 3,
  })
  homePoints!: number;

  @Column({
    default: 7,
  })
  drawPoints!: number;

  @Column({
    default: 10,
  })
  awayPoints!: number;

}