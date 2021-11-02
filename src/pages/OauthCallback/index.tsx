import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
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
      <Dimmer active={true} page={true}>
        <Loader active={true} size="massive">
          まもなくリダイレクトします
        </Loader>
      </Dimmer>
    </LoginLayout>
  );
};

export default OAuthCallbackPage;
