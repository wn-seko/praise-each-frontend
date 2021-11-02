import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { GithubButton, GoogleButton } from '~/components/ui/Button';
import SegmentContainer from '~/components/ui/SegmentContainer';
import { useOAuthLinkageLinks } from './hooks';

const MarginedSegment = styled.div`
  width: 20em;
  min-height: 5em;

  > * {
    margin-bottom: 1em !important;
  }
`;

const AccountSettings: FC = () => {
  const { linkageUrls } = useOAuthLinkageLinks();

  return (
    <SegmentContainer title="アカウント">
      <Segment.Group>
        <Segment>
          <Header as="h4">ログインアカウント</Header>
          <MarginedSegment>
            {linkageUrls.github && (
              <GithubButton as="a" fluid size="mini" href={linkageUrls.github}>
                GitHub アカウントを連携する
              </GithubButton>
            )}
            {linkageUrls.google && (
              <GoogleButton as="a" fluid size="mini" href={linkageUrls.google}>
                Google アカウントを連携する
              </GoogleButton>
            )}
          </MarginedSegment>
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default AccountSettings;
