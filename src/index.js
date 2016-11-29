import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import './css/index.css';
import Home from './components/Home';
import Splash from './components/Splash';
import Nav from './components/Nav';

render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash}/>
      <Route path="/nav" component={Nav}>
        <Route path="/home" component={Home}></Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
