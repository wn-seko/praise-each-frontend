import React, { FC } from 'react';

import { GithubButton, GoogleButton } from '~/components/ui/Button';
import Segment from '~/components/ui/Segment';

import { useOAuthLinkageLinks } from './hooks';

const AccountSettings: FC = () => {
  const { linkageUrls } = useOAuthLinkageLinks();

  return (
    <Segment title="アカウント">
      <Segment.Item title="ログインアカウント">
        {linkageUrls.github && (
          <GithubButton width={320} as="a" size="md" href={linkageUrls.github}>
            GitHub アカウントを連携する
          </GithubButton>
        )}
        {linkageUrls.google && (
          <GoogleButton width={320} as="a" size="md" href={linkageUrls.google}>
            Google アカウントを連携する
          </GoogleButton>
        )}
      </Segment.Item>
    </Segment>
  );
};

export default AccountSettings;
