import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthUser } from '~/recoil/auth';

interface AuthProps {
  requireLogin: boolean;
  to: string;
}

const Auth: FC<AuthProps> = ({ requireLogin, to, children }) => {
  const { user } = useAuthUser();

  if ((requireLogin && !user) || (!requireLogin && user)) {
    return <Navigate to={to} replace={false} />;
  }

  return <>{children}</>;
};

export default Auth;
