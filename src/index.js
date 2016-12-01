import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './App';
import AuthService from './utils/AuthService';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Challenge from './components/Challenge';
import Login from './components/Login';

const auth = new AuthService('mlbGKlnsQ4HREGTkak1GI9oTnnWHCUgw', 'abglassford.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

render (
  <Router history={browserHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/login" />
      <Route path="/login" component={Login}></Route>
      <Route path="/nav" component={Nav}>
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/challenge" component={Challenge}></Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
