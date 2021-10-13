// tslint:disable:jsx-no-lambda
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from '~/components/functional/Auth';
import TopPage from '~/pages/Top';
import StatisticsPage from '~/pages/Statistics';
import LoginPage from '~/pages/Login';
import OAuthCallbackPage from '~/pages/OauthCallback';
import UsersPage from '~/pages/Users';

const Routes = () => {
  return (
    <Router>
      <Auth requireLogin={false}>
        <Switch>
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/oauth/github/callback" render={() => <OAuthCallbackPage type="github" />} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </Auth>
      <Auth requireLogin={true}>
        <Switch>
          <Route exact={true} path="/" component={TopPage} />
          <Route exact={true} path="/users" component={UsersPage} />
          <Route exact={true} path="/statistics" component={StatisticsPage} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Auth>
    </Router>
  );
};

export default Routes;
