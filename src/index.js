import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Challenge from './components/Challenge';
import Profile from './components/Profile';
import Default404 from './components/Default404';

function loggedIn () {
  if (!localStorage.fb_token && !localStorage.fb_id) {
    browserHistory.push('/home')
  }
}

render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home}/>
      <Route path="/dashboard" component={Dashboard} onEnter={loggedIn}/>
      <Route path="/challenge" component={Challenge} onEnter={loggedIn}/>
      <Route path="/profile/:id" component={Profile}/>
      <Route path="/404" component={Default404}/>
      <Redirect from="*" to="/404" />
    </Route>
  </Router>,
  document.getElementById('root')
);
