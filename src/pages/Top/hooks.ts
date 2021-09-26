import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Praise } from '~/domains/praise';
import { fetchPraise as fetchPraiseApi } from '~/requests/praise';

const formatPraise = (praise: Praise) => ({
  ...praise,
  createdAt: praise.createdAt.format('YYYY/MM/DD HH:mm'),
});

export const usePraise = () => {
  const [{ loading, value }, fetchPraise] = useAsyncFn(() => fetchPraiseApi());

  useEffect(() => {
    fetchPraise();
  }, []);

  return { loading, priases: (value || []).map(formatPraise) };
};
