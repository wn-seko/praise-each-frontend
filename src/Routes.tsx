// tslint:disable:jsx-no-lambda
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TopPage from '~/pages/Top';
import StatisticsPage from './pages/Statistics';
import LoginPage from './pages/Login';
import OAuthCallbackPage from './pages/OauthCallback';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact={true} path="/" component={TopPage} />
        <Route exact={true} path="/statistics" component={StatisticsPage} />
        <Route exact={true} path="/oauth/github/callback" render={() => <OAuthCallbackPage type="github" />} />
        <Route path="*" render={() => <Redirect to="/" />} />
        {/* <Route path="*" render={() => <Redirect to="/login" />} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
