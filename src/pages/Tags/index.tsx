import React, { FC } from 'react';
import { Pagination, PaginationProps } from 'semantic-ui-react';
import { Alert, AlertIcon, Box, Center, Flex, Grid, GridItem } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import DefaultLayout from '~/layouts/default';
import CreateTag from './CreateTag';
import { useTags } from './hooks';
import Loader from '~/components/ui/Loader';
import { getThemeColor } from '~/layouts/theme';

const TagsPage: FC = () => {
  const { loading, tags, pagination, handlePageChange, refetch } = useTags();

  const onPageChange = (_: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps) => {
    handlePageChange(Number(data.activePage));
  };

  if (loading) {
    return (
      <DefaultLayout>
        <Loader page={true}>Loading...</Loader>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Center>
        <Flex width="80%" direction="column" gap={8}>
          <Box textAlign="right">
            <CreateTag refresh={refetch} />
          </Box>
          {tags.length > 0 ? (
            <Flex direction="column" gap={3}>
              <Grid height="20em" templateColumns="repeat(4, 1fr)" gap={6}>
                {tags.map((tag) => (
                  <GridItem key={tag.id}>
                    <Flex
                      direction="row"
                      borderBottom="1px solid"
                      borderBottomColor={getThemeColor('border')}
                      justifyContent="space-between"
                    >
                      <Box>{tag.name}</Box>
                      <FaTrashAlt size={16} cursor="pointer" onClick={tag.onDelete} />
                    </Flex>
                  </GridItem>
                ))}
              </Grid>
              <Flex justifyContent="center">
                <Pagination
                  activePage={pagination.currentPage}
                  totalPages={pagination.pages}
                  onPageChange={onPageChange}
                />
              </Flex>
            </Flex>
          ) : (
            <Alert status="info">
              <AlertIcon />
              まだタグが登録されていません
            </Alert>
          )}
        </Flex>
      </Center>
    </DefaultLayout>
  );
};

export default TagsPage;
