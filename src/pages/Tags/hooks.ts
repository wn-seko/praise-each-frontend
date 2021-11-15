import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { searchTags as searchTagsApi, deleteTag } from '~/requests/tag';

export const useTags = () => {
  const [state, searchTags] = useAsyncFn(async () => searchTagsApi());
  const loading = state.loading;
  const defaultPagination = { list: [], pagination: { currentPage: 1, limit: 20, pages: 1 } };
  const paginationTags = state.value?.isSuccess() ? state.value.value : defaultPagination;
  const { list: tags, pagination } = paginationTags;

  const createHandleDelete = (tagId: string) => () => {
    deleteTag(tagId).then(() => {
      searchTags();
    });
  };

  const enhancedTags = tags.map((tag) => ({
    ...tag,
    onDelete: createHandleDelete(tag.id),
  }));

  useEffect(() => {
    searchTags();
  }, []);

  return { loading, tags: enhancedTags, pagination, refresh: searchTags };
};
