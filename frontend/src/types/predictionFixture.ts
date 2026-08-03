export interface PredictionFixture {
  id: number;

  matchday: {
    id: number;
    number: number;
  };

  homeUser: {
    id: number;
    username: string;
  };

  awayUser: {
    id: number;
    username: string;
  };

  homeGoals: number;
  awayGoals: number;

  played: boolean;
}