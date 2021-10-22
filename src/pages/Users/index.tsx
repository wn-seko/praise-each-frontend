import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import UserList from '~/components/domains/User/UserList';
import DefaultLayout from '~/layouts/default';
import { useUsers } from './hooks';

const UsersPage: FC = () => {
  const { loading, users } = useUsers();

  return (
    <DefaultLayout loading={loading}>
      <Container>
        <UserList>
          {users.map((user) => (
            <UserList.Item key={user.id} user={user} />
          ))}
        </UserList>
      </Container>
    </DefaultLayout>
  );
};

export default UsersPage;
