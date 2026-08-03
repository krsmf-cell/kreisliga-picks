import { Injectable } from "@nestjs/common";

@Injectable()
export class RoundRobinService {

  generate<T>(players: T[]): [T, T][][] {

    const list = [...players];

    if (list.length % 2 === 1) {
      list.push(null as T);
    }

    const rounds: [T, T][][] = [];

    const n = list.length;

    for (let round = 0; round < n - 1; round++) {

      const fixtures: [T, T][] = [];

      for (let i = 0; i < n / 2; i++) {

        const home = list[i];
        const away = list[n - 1 - i];

        if (home && away) {

          if (round % 2 === 0) {
            fixtures.push([home, away]);
          } else {
            fixtures.push([away, home]);
          }

        }

      }

      rounds.push(fixtures);

      const fixed = list[0];

      const rotated = [
        fixed,
        list[n - 1],
        ...list.slice(1, n - 1),
      ];

      list.splice(0, list.length, ...rotated);

    }

    return rounds;

  }

}