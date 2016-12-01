import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import './css/index.css';
import Splash from './components/Splash';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Challenge from './components/Challenge';

render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash}/>
      <Route path="/nav" component={Nav}>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/challenge" component={Challenge}></Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
