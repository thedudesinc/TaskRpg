export interface QuestInput {
  userId: string;
  Name: string;
  ChallengeLevel: [number];
  Xp: number;
  Gold: number;
}

export interface QuestOutput {
  id: string;
  userId: string;
  Name: string;
  ChallengeLevel: [number];
  Xp: number;
  Gold: number;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
