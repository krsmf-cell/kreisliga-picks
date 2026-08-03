import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Match } from "../../matches/entities/match.entity";
import { PredictionChoice } from "../enums/prediction-choice.enum";

@Entity()
export class Prediction {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToOne(() => Match, {
    eager: true,
    onDelete: "CASCADE",
  })
  match!: Match;

  @Column({
    type: "enum",
    enum: PredictionChoice,
  })
  choice!: PredictionChoice;
  
@Column({
  default: 0,
})
points!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}