import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { League } from "../../leagues/entities/league.entity";

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @Column({
    nullable: true,
  })
  shortName!: string;

  @Column({
    nullable: true,
  })
  logo?: string;

  @ManyToOne(() => League, {
    eager: true,
  })
  league!: League;

  @Column({
    default: true,
  })
  active!: boolean;

  // ===================================
  // Rating
  // ===================================

  @Column({
    type: "float",
    default: 1500,
  })
  rating!: number;

  // ===================================
  // Tabelle
  // ===================================

  @Column({
    default: 0,
  })
  played!: number;

  @Column({
    default: 0,
  })
  wins!: number;

  @Column({
    default: 0,
  })
  draws!: number;

  @Column({
    default: 0,
  })
  losses!: number;

  @Column({
    default: 0,
  })
  goalsFor!: number;

  @Column({
    default: 0,
  })
  goalsAgainst!: number;

  @Column({
    default: 0,
  })
  goalDifference!: number;

  @Column({
    default: 0,
  })
  points!: number;

  // ===================================
  // Heim / Auswärts
  // ===================================

  @Column({
    default: 0,
  })
  homeWins!: number;

  @Column({
    default: 0,
  })
  awayWins!: number;

  @Column({
    default: 0,
  })
  homePlayed!: number;

  @Column({
    default: 0,
  })
  awayPlayed!: number;

  // ===================================
  // Form
  // ===================================

  @Column({
    type: "simple-array",
    default: "",
  })
  lastFive!: string[];

  @Column({
    default: 0,
  })
  currentStreak!: number;

}