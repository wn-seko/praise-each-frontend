// tslint:disable:jsx-no-lambda
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from '~/components/functional/Auth';
import TopPage from '~/pages/Top';
import StatisticsPage from '~/pages/Statistics';
import LoginPage from '~/pages/Login';
import OAuthCallbackPage from '~/pages/OauthCallback';

const Routes = () => {
  return (
    <Router>
      <Auth requireLogin={false}>
        <Switch>
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/oauth/github/callback" render={() => <OAuthCallbackPage type="github" />} />
          <Route exact={true} path="/oauth/google/callback" render={() => <OAuthCallbackPage type="google" />} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </Auth>
      <Auth requireLogin={true}>
        <Switch>
          <Route exact={true} path="/" component={TopPage} />
          <Route exact={true} path="/statistics" component={StatisticsPage} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Auth>
    </Router>
  );
};

export default Routes;
