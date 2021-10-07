import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import LoginLayout from '~/layouts/login';
import { UseGithubLogin } from './hooks';

type OauthType = 'github';

interface OAuthCallbackPageProps {
  type: OauthType;
}

const getUseLoginHooks = (type: OauthType) => {
  switch (type) {
    case 'github':
      return UseGithubLogin;
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
