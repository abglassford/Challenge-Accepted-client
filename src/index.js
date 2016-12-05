import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Challenge from './components/Challenge';
import Profile from './components/Profile';
import Default404 from './components/Default404';

render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="home" />
      <Route path="home" component={Home}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="challenge" component={Challenge}/>
      <Route path="profile" component={Profile}/>
      <Route path="404" component={Default404}/>
      <Redirect from="*" to="404" />
    </Route>
  </Router>,
  document.getElementById('root')
);
