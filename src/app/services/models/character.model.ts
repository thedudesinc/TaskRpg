export interface CharacterInput {
  UserId: string;
  Name: string;
  Level: number;
  Xp: number;
  Gold: number;
}

export interface CharacterOutput {
  id: string;
  userId: number;
  Name: string;
  Level: number;
  Xp: number;
  Gold: number;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
