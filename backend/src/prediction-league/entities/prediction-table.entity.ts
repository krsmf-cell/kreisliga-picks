import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Season } from "../../seasons/entities/season.entity";

@Entity()
export class PredictionTable {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Season)
  season!: Season;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  games!: number;

  @Column()
  wins!: number;

  @Column()
  draws!: number;

  @Column()
  losses!: number;

  @Column()
  goalsFor!: number;

  @Column()
  goalsAgainst!: number;

  @Column()
  goalDifference!: number;

  @Column()
  points!: number;

  @Column("simple-array")
  lastFive!: string[];
}