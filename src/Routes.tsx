// tslint:disable:jsx-no-lambda
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import TopPage from '~/pages/Top'
import { BrowserRouter as Router } from 'react-router-dom'

// import Notification from './pages/Notification'
// import Login from './pages/Login'

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        {/* <Notification> */}
        {/* <Switch> */}
        <Route exact={true} path="/" component={TopPage} />
        <Route path="*" render={() => <Redirect to="/" />} />
        {/* </Switch> */}
        {/* </Notification> */}
        {/* <Route path="*" render={() => <Redirect to="/login" />} /> */}
      </Switch>
    </Router>
  )
}

export default Routes
