import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { fetchPraise as fetchPraiseApi } from '~/requests/praise';

export const usePraise = () => {
  const [{ loading, value }, fetchPraise] = useAsyncFn(() => fetchPraiseApi());

  useEffect(() => {
    fetchPraise();
  }, []);

  return { loading, priases: value || [] };
};
