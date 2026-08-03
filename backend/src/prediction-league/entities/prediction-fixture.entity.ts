import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { Season } from "../../seasons/entities/season.entity";
import { Matchday } from "../../matchdays/entities/matchday.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class PredictionFixture {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Season, {
    eager: true,
    onDelete: "CASCADE",
  })
  season!: Season;

  @ManyToOne(() => Matchday, {
    eager: true,
    onDelete: "CASCADE",
  })
  matchday!: Matchday;

  @ManyToOne(() => User, {
    eager: true,
  })
  homeUser!: User;

  @ManyToOne(() => User, {
    eager: true,
  })
  awayUser!: User;

  @Column({
    default: 0,
  })
  homeGoals!: number;

  @Column({
    default: 0,
  })
  awayGoals!: number;

  @Column({
    default: false,
  })
  played!: boolean;
}