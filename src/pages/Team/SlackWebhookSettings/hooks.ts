import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import {
  postTeamSlackWebhook as postTeamSlackWebhookApi,
  putTeamSlackWebhook as putTeamSlackWebhookApi,
  deleteTeamSlackWebhook as deleteTeamSlackWebhookApi,
} from '~/requests/slackWebhook';
import { fetchTeamSlackWebhooks as fetchTeamSlackWebhooksApi } from '~/requests/slackWebhook';

export const useTeamSlackWebhook = (teamId: string) => {
  const [state, fetchTeamSlackWebhooks] = useAsyncFn(fetchTeamSlackWebhooksApi);
  const teamSlackWebhooks = state.value && state.value.isSuccess() ? state.value.value : [];

  const refetch = useCallback(() => {
    fetchTeamSlackWebhooks(teamId);
  }, [teamId]);

  useEffect(() => {
    refetch();
  }, []);

  return { teamSlackWebhooks, refetch };
};

export const useAddTeamSlackWebhook = (teamId: string, refresh: () => void) => {
  const [state, postTeamSlackWebhook] = useAsyncFn(postTeamSlackWebhookApi);

  const handleAdd = async (url: string, name: string, description: string, close: () => void) => {
    const addTeamResult = await postTeamSlackWebhook(teamId, url, name, description);

    if (addTeamResult.isFailure()) {
      toast.error('Webhookの追加に失敗しました');
      return;
    }

    toast.success('Webhookを追加しました');
    close();
    refresh();
  };

  return { creating: state.loading, handleAdd };
};

export const useUpdateTeamSlackWebhook = (teamId: string, refresh: () => void) => {
  const [state, putTeamSlackWebhook] = useAsyncFn(putTeamSlackWebhookApi);

  const createHandleUpdate =
    (id: string) => async (url: string, name: string, description: string, close: () => void) => {
      const updateTeamResult = await putTeamSlackWebhook(id, teamId, url, name, description);

      if (updateTeamResult.isFailure()) {
        toast.error('Webhookの保存に失敗しました');
        return;
      }

      toast.success('Webhookを保存しました');
      close();
      refresh();
    };

  return { updating: state.loading, createHandleUpdate };
};

export const useDeleteTeamSlackWebhook = (refresh: () => void) => {
  const [state, deleteTeamSlackWebhook] = useAsyncFn(deleteTeamSlackWebhookApi);

  const createHandleDelete = (id: string) => async () => {
    const deleteTeamResult = await deleteTeamSlackWebhook(id);

    if (deleteTeamResult.isFailure()) {
      toast.error('Webhookの削除に失敗しました');
      return;
    }

    toast.success('Webhookを削除しました');
    refresh();
  };

  return { deleting: state.loading, createHandleDelete };
};
