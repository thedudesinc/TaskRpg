export interface QuestInput {
  userId: string | null;
  title: string;
  description: string;
  xp: number;
  gold: number;
}

export interface QuestFormInput {
  userId: string | null;
  title: string;
  description: string;
  difficulty: number;
  time: number;
  avoidance: number;
}

export interface QuestOutput {
  id: string;
  userId: string;
  title: string;
  description: string;
  xp: number;
  gold: number;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
