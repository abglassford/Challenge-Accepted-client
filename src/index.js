import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Default404 from './components/Default404';

render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/404" component={Default404}/>
      <Redirect from="*" to="/404" />
    </Route>
  </Router>,
  document.getElementById('root')
);
