import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import AuthService from './utils/AuthService';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Challenge from './components/Challenge'
import Default404 from './components/Default404';

const auth = new AuthService('mlbGKlnsQ4HREGTkak1GI9oTnnWHCUgw', 'abglassford.auth0.com')

const requireAuth = (nextState, replace) => {
  if(!auth.loggedIn()) {
    replace({ pathname: '/home'})
  }
}

render (
  <Router history={browserHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home}/>
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}/>
      <Route path="/challenge" component={Challenge}/>
      <Route path="/404" component={Default404}/>
      <Redirect from="*" to="/404" />
    </Route>
  </Router>,
  document.getElementById('root')
);
