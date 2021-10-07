import React, { FC } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import { GithubButton } from '~/components/ui/Button';
import LoginLayout from '~/layouts/login';

const LoginPage: FC = () => (
  <LoginLayout>
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Praise Each
        </Header>
        <Form size="large">
          <Segment>
            {OAUTH_LOGIN_URL.github && (
              <GithubButton as="a" fluid size="large" href={OAUTH_LOGIN_URL.github}>
                GitHub アカウントでログイン
              </GithubButton>
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  </LoginLayout>
);

export default LoginPage;
