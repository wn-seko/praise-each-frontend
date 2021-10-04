// tslint:disable:jsx-no-lambda
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TopPage from '~/pages/Top';
import StatisticsPage from './pages/Statistics';
// import Login from './pages/Login'

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route exact={true} path="/" component={TopPage} />
        <Route exact={true} path="/statistics" component={StatisticsPage} />
        <Route path="*" render={() => <Redirect to="/" />} />
        {/* <Route path="*" render={() => <Redirect to="/login" />} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
