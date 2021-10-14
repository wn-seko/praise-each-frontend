import { User } from './user';

export interface Team {
  id: string;
  name: string;
  color: string;
  users: User[];
}
