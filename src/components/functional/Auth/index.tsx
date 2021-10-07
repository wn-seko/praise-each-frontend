import React, { FC } from 'react';
import { useAuthUser } from '~/recoil/auth';

interface AuthProps {
  requireLogin: boolean;
}

const Auth: FC<AuthProps> = ({ requireLogin, children }) => {
  const { user } = useAuthUser();

  if ((requireLogin && !user) || (!requireLogin && user)) {
    return null;
  }

  return <>{children}</>;
};

export default Auth;
