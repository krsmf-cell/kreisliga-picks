import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  UpdateDateColumn,
  Unique,
} from "typeorm";

import { Team } from "../../teams/entities/team.entity";
import { Season } from "../../seasons/entities/season.entity";

@Entity()
@Unique(["team", "season"])
export class TeamStatistics {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team, {
    eager: true,
    onDelete: "CASCADE",
  })
  team!: Team;

  @ManyToOne(() => Season, {
    eager: true,
    onDelete: "CASCADE",
  })
  season!: Season;

  @Column({ default: 0 })
  games!: number;

  @Column({ default: 0 })
  wins!: number;

  @Column({ default: 0 })
  draws!: number;

  @Column({ default: 0 })
  losses!: number;

  @Column({ default: 0 })
  goalsFor!: number;

  @Column({ default: 0 })
  goalsAgainst!: number;

  @Column({ default: 0 })
  goalDifference!: number;

  @Column({ default: 0 })
  points!: number;

  @Column({
    type: "decimal",
    precision: 7,
    scale: 2,
    default: 1500,
  })
  elo!: number;

  @Column({ default: 0 })
  homeGames!: number;

  @Column({ default: 0 })
  awayGames!: number;

  @Column({ default: 0 })
  homeWins!: number;

  @Column({ default: 0 })
  awayWins!: number;

  @Column({ default: 0 })
  homeGoals!: number;

  @Column({ default: 0 })
  awayGoals!: number;

@Column({ default: 0 })
homePoints!: number;

@Column({ default: 0 })
awayPoints!: number;

@Column({
  type: "decimal",
  precision: 5,
  scale: 2,
  default: 0,
})
goalsPerGame!: number;

@Column({
  type: "decimal",
  precision: 5,
  scale: 2,
  default: 0,
})
goalsAgainstPerGame!: number;

@Column({ default: 0 })
cleanSheets!: number;

@Column({ default: 0 })
failedToScore!: number;

@Column({
  type: "simple-json",
  nullable: true,
})
lastFive!: ("W" | "D" | "L")[];

  @UpdateDateColumn()
  updatedAt!: Date;
}