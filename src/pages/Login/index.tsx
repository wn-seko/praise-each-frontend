import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import { GithubButton, GoogleButton } from '~/components/ui/Button';
import LoginLayout from '~/layouts/login';
import { useLogin } from './hooks';

const MarginedSegment = styled(Segment)`
  min-height: 5em;

  > * {
    margin-bottom: 1em !important;
  }
`;

const LoginPage: FC = () => {
  const { loading, urls } = useLogin();

  return (
    <LoginLayout>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Praise Each
          </Header>
          <Form size="large">
            <MarginedSegment loading={loading}>
              {urls.github && (
                <GithubButton as="a" fluid size="large" href={urls.github}>
                  GitHub アカウントでログイン
                </GithubButton>
              )}
              {urls.google && (
                <GoogleButton as="a" fluid size="large" href={urls.google}>
                  Google アカウントでログイン
                </GoogleButton>
              )}
            </MarginedSegment>
          </Form>
        </Grid.Column>
      </Grid>
    </LoginLayout>
  );
};

export default LoginPage;
