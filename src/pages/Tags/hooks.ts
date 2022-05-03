import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';

import { searchTags as searchTagsApi, deleteTag } from '~/requests/tag';

interface SearchParams {
  word?: string;
  page: number;
}

export const useTags = () => {
  const [state, searchTags] = useAsyncFn(async ({ word, page }: SearchParams) => searchTagsApi(word, page, 40));
  const loading = state.loading;
  const defaultPagination = { list: [], pagination: { currentPage: 1, limit: 20, pages: 1 } };
  const paginationTags = state.value?.isSuccess() ? state.value.value : defaultPagination;
  const { list: tags, pagination } = paginationTags;

  const refetch = () => searchTags({ page: 1 });

  const handlePageChange = (page: number) => {
    searchTags({ page });
  };

  const createHandleDelete = (tagId: string) => () => {
    deleteTag(tagId).then(() => {
      refetch();
    });
  };

  const enhancedTags = tags.map((tag) => ({
    ...tag,
    onDelete: createHandleDelete(tag.id),
  }));

  useEffect(() => {
    refetch();
  }, []);

  return { loading, tags: enhancedTags, pagination, handlePageChange, refetch };
};
