export interface Author {
  id?: number;
  name: string;
  birthYear: number;
  deathYear: number;
  biography: string;
  career: string;
  type: "POET" | "WRITER";
  listImages?: { url: string }[];
  listAchievements?: { id: number }[]; // Only id here
  created?: string;
  updated?: string;
}
