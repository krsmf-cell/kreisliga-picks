import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from "typeorm";

import { Team } from "../../teams/entities/team.entity";
import { Season } from "../../seasons/entities/season.entity";

@Entity()
@Unique(["team", "season"])
export class TeamRating {

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

  @Column({
    type: "decimal",
    precision: 7,
    scale: 2,
    default: 1500,
  })
  rating!: number;

  @Column({
    default: 0,
  })
  games!: number;

}