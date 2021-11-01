import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import LoginLayout from '~/layouts/login';
import { UseGithubLogin, UseGoogleLogin } from './hooks';

type OauthType = 'github' | 'google';

interface OAuthCallbackPageProps {
  type: OauthType;
}

const getUseLoginHooks = (type: OauthType) => {
  switch (type) {
    case 'github':
      return UseGithubLogin;
    case 'google':
      return UseGoogleLogin;
  }
};

const OAuthCallbackPage: FC<OAuthCallbackPageProps> = ({ type }) => {
  const useLogin = getUseLoginHooks(type);
  useLogin();

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
