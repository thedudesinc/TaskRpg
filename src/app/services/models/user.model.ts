export interface UserInput {
  id: string | null;
  displayName: string;
  email: string;
  password?: string;
}

export interface UserOutput {
  id: string;
  displayName: string;
  email: string;
  password: string;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}

export interface LoginResponse {
  id: string;
  displayName: string;
  email: string;
  stringToken: string;
}
