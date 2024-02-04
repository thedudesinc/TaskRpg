export interface CharacterInput {
  userId: string | null;
  name: string;
  level: number;
  xp: number;
  gold: number;
}

export interface CharacterOutput {
  id: string;
  userId: number;
  name: string;
  level: number;
  xp: number;
  gold: number;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
