export type User = {
  id?: number;
  username: string;
  password: string;
  name?: string;
};

export type UserStateType = {
  loading: boolean;
  users: User[];
  error: string | null;
  user: User;
  username: string;
  name: string;
  password: string;
};
