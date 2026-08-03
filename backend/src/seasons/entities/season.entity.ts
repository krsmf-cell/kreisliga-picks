import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { League } from "../../leagues/entities/league.entity";

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @ManyToOne(() => League, {
    eager: true,
  })
  league!: League;

  @Column({
    type: "date",
  })
  startDate!: Date;

  @Column({
    type: "date",
  })
  endDate!: Date;

  @Column({
    default: false,
  })
  active!: boolean;
}