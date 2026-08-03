import type { Season } from "./season";

export interface League {
  id: number;

  name: string;

  code: string;

  isPublic: boolean;

  seasons?: Season[];
}