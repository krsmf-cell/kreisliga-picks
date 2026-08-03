import { Injectable } from "@nestjs/common";

@Injectable()
export class RatingService {

  readonly K = 25;

  expected(
    ratingA: number,
    ratingB: number,
  ) {
    return 1 /
      (
        1 +
        Math.pow(
          10,
          (ratingB - ratingA) / 400,
        )
      );
  }

}