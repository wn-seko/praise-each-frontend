import { TeamSlackWebhook } from '~/domains/slackWebhook';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface TeamSlackWebhookResponse {
  id: string;
  teamId: string;
  url: string;
  name: string;
  description: string;
}

const responseToTeamSlackWebhook = (response: TeamSlackWebhookResponse): TeamSlackWebhook => ({
  id: response.id,
  teamId: response.teamId,
  url: response.url,
  name: response.name,
  description: response.description,
});

export const postTeamSlackWebhook = (
  teamId: string,
  url: string,
  name: string,
  description: string,
): Promise<Result<TeamSlackWebhook, {}>> =>
  api
    .post<unknown, TeamSlackWebhookResponse>('/teamSlackWebhooks', { teamId, url, name, description })
    .then((response) => new Success<TeamSlackWebhook, {}>(responseToTeamSlackWebhook(response)))
    .catch(() => new Failure<TeamSlackWebhook, {}>({}));

export const putTeamSlackWebhook = (
  id: string,
  teamId: string,
  url: string,
  name: string,
  description: string,
): Promise<Result<TeamSlackWebhook, {}>> =>
  api
    .put<unknown, TeamSlackWebhookResponse>(`/teamSlackWebhooks/${id}`, { teamId, url, name, description })
    .then((response) => new Success<TeamSlackWebhook, {}>(responseToTeamSlackWebhook(response)))
    .catch(() => new Failure<TeamSlackWebhook, {}>({}));

export const fetchTeamSlackWebhooks = (teamId: string): Promise<Result<TeamSlackWebhook[], {}>> =>
  api
    .get<unknown, TeamSlackWebhookResponse[]>('/teamSlackWebhooks', { params: { teamId } })
    .then((response) => new Success<TeamSlackWebhook[], {}>(response.map(responseToTeamSlackWebhook)))
    .catch(() => new Failure<TeamSlackWebhook[], {}>({}));

export const deleteTeamSlackWebhook = (id: string): Promise<Result<{}, {}>> =>
  api
    .delete<unknown, TeamSlackWebhookResponse>(`/teamSlackWebhooks/${id}`)
    .then(() => new Success<{}, {}>({}))
    .catch(() => new Failure<{}, {}>({}));
