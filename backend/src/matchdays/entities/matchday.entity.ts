import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Season } from "../../seasons/entities/season.entity";
import { Match } from "../../matches/entities/match.entity";

@Entity()
export class Matchday {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: number;

  @ManyToOne(() => Season, {
    eager: true,
  })
  season!: Season;

  @OneToMany(
    () => Match,
    (match) => match.matchday,
  )
  matches!: Match[];

  @Column({
    type: "timestamp",
  })
  deadline!: Date;

  @Column({
    default: false,
  })
  active!: boolean;

}