export interface User {
  id: number;
  username: string;
  email: string;

  role: "USER" | "MODERATOR" | "ADMIN";

  active: boolean;

  predictionLeague: boolean;
}