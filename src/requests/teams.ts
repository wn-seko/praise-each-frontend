import { Team } from '~/domains/team';
import { User } from '~/domains/user';
import { Pagination } from '~/utils/pagination';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface SearchTeamParams {
  name?: string;
}

interface TeamResponse {
  id: string;
  name: string;
  color: string;
  users: User[];
}

type PaginationTeamResponse = Pagination<TeamResponse>;

const responseToTeam = (response: TeamResponse): Team => ({
  id: response.id,
  name: response.name,
  color: response.color,
  users: response.users,
});

const responseToPaginationTeam = (response: PaginationTeamResponse): Pagination<Team> => ({
  list: response.list.map(responseToTeam),
  pagination: response.pagination,
});

export const postTeam = (name: string, color: string): Promise<Result<Team, {}>> =>
  api
    .post<unknown, TeamResponse>('/teams', { name, color })
    .then((response) => new Success<Team, {}>(responseToTeam(response)))
    .catch(() => new Failure<Team, {}>({}));

export const searchTeam = (params: SearchTeamParams = {}): Promise<Result<Pagination<Team>, {}>> =>
  api
    .get<unknown, PaginationTeamResponse>('/teams', { params })
    .then((response) => new Success<Pagination<Team>, {}>(responseToPaginationTeam(response)))
    .catch(() => new Failure<Pagination<Team>, {}>({}));
