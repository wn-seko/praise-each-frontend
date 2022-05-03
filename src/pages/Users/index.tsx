import { Box, Center } from '@chakra-ui/react';
import React, { FC } from 'react';

import UserList from '~/components/domains/User/UserList';
import Loader from '~/components/ui/Loader';
import DefaultLayout from '~/layouts/default';

import { useUsers } from './hooks';

const UsersPage: FC = () => {
  const { loading, users } = useUsers();

  if (loading) {
    return (
      <DefaultLayout>
        <Loader page={true}>Loading...</Loader>)
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Center>
        <Box width="80%">
          <UserList>
            {users.map((user) => (
              <UserList.Item key={user.id} user={user} />
            ))}
          </UserList>
        </Box>
      </Center>
    </DefaultLayout>
  );
};

export default UsersPage;
