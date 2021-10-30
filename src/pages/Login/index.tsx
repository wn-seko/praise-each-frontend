import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import { GithubButton, GoogleButton } from '~/components/ui/Button';
import LoginLayout from '~/layouts/login';

const MarginedSegment = styled(Segment)`
  > * {
    margin-bottom: 1em !important;
  }
`;

const LoginPage: FC = () => (
  <LoginLayout>
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Praise Each
        </Header>
        <Form size="large">
          <MarginedSegment>
            {OAUTH_LOGIN_URL.github && (
              <GithubButton as="a" fluid size="large" href={OAUTH_LOGIN_URL.github}>
                GitHub アカウントでログイン
              </GithubButton>
            )}
            {OAUTH_LOGIN_URL.google && (
              <GoogleButton as="a" fluid size="large" href={OAUTH_LOGIN_URL.google}>
                Google アカウントでログイン
              </GoogleButton>
            )}
          </MarginedSegment>
        </Form>
      </Grid.Column>
    </Grid>
  </LoginLayout>
);

export default LoginPage;
