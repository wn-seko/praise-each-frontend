import { TeamPin } from '~/domains/teamPin';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface TeamPinResponse {
  userId: string;
  teamId: string;
}

const responseToTeamPin = (response: TeamPinResponse): TeamPin => ({
  userId: response.userId,
  teamId: response.teamId,
});

export const postTeamPin = (teamId: string): Promise<Result<TeamPin, {}>> =>
  api
    .post<unknown, TeamPinResponse>('/teamPins', { teamId })
    .then((response) => new Success<TeamPin, {}>(responseToTeamPin(response)))
    .catch(() => new Failure<TeamPin, {}>({}));

export const fetchTeamPins = (): Promise<Result<TeamPin[], {}>> =>
  api
    .get<unknown, TeamPinResponse[]>(`/teamPins`)
    .then((response) => new Success<TeamPin[], {}>(response.map(responseToTeamPin)))
    .catch(() => new Failure<TeamPin[], {}>({}));

export const deleteTeamPin = (teamId: string): Promise<Result<{}, {}>> =>
  api
    .delete<unknown, TeamPinResponse>(`/teamPins/${teamId}`)
    .then(() => new Success<{}, {}>({}))
    .catch(() => new Failure<{}, {}>({}));
