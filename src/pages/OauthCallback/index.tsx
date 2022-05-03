import React, { FC } from 'react';

import Loader from '~/components/ui/Loader';
import { OAuthType } from '~/domains/oauth';
import LoginLayout from '~/layouts/login';

import { useOauthCallback } from './hooks';

interface OAuthCallbackPageProps {
  type: OAuthType;
}

const OAuthCallbackPage: FC<OAuthCallbackPageProps> = ({ type }) => {
  useOauthCallback(type);

  return (
    <LoginLayout>
      <Loader page={true} noHeader={true}>
        まもなくリダイレクトします
      </Loader>
    </LoginLayout>
  );
};

export default OAuthCallbackPage;
