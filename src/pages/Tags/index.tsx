import { Alert, AlertIcon, Box, Center, Flex, Grid, GridItem } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import Loader from '~/components/ui/Loader';
import Pagination from '~/components/ui/Pagination';
import DefaultLayout from '~/layouts/default';
import { getThemeColor } from '~/layouts/theme';

import CreateTag from './CreateTag';
import { useTags } from './hooks';

const TagsPage: FC = () => {
  const { loading, tags, pagination, handlePageChange, refetch } = useTags();

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
            <Flex direction="column" gap={3} minHeight="40em">
              <Box minHeight="30em">
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
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
              </Box>
              <Flex justifyContent="center">
                <Pagination
                  activePage={pagination.currentPage}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              </Flex>
            </Flex>
          ) : (
            <Alert status="info">
              <AlertIcon />
              ??????????????????????????????????????????
            </Alert>
          )}
        </Flex>
      </Center>
    </DefaultLayout>
  );
};

export default TagsPage;
