import { QuestTag } from '../enums/quest-tag.enum';

export interface QuestInput {
  userId: string | null;
  title: string;
  description: string;
  tag: QuestTag;
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
  tag: QuestTag;
  xp: number;
  gold: number;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
