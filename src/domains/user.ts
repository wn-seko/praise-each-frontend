import { Team } from './team';

export interface User {
  id: string;
  name: string;
  icon: string;
  teams: Team[];
}
