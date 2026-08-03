import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";

import { Season } from "../../seasons/entities/season.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
@Unique(["season", "user"])
export class PredictionStanding {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Season, {
    eager: true,
    onDelete: "CASCADE",
  })
  season!: Season;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
  user!: User;

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
    type: "simple-json",
    nullable: true,
  })
  lastFive!: ("W" | "D" | "L")[];
}