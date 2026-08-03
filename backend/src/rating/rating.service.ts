import { Injectable } from "@nestjs/common";

@Injectable()
export class RatingService {

  expectedScore(
    homeRating: number,
    awayRating: number,
  ) {
    return 1 /
      (
        1 +
        Math.pow(
          10,
          (awayRating - homeRating) / 400,
        )
      );
  }

  updateRatings(
    homeRating: number,
    awayRating: number,
    result: 0 | 0.5 | 1,
  ) {
    const K = 32;

    const expectedHome =
      this.expectedScore(
        homeRating,
        awayRating,
      );

    const expectedAway =
      this.expectedScore(
        awayRating,
        homeRating,
      );

    return {

      home:
        homeRating +
        K * (result - expectedHome),

      away:
        awayRating +
        K *
          ((1 - result) - expectedAway),
    };
  }
}