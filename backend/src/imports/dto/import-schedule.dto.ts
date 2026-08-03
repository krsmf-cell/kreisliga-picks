import { IsUrl } from "class-validator";

export class ImportScheduleDto {

  @IsUrl()
  url!: string;

}