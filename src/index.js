import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import './index.css';
import Home from './Home';
import Splash from './Splash';
import Nav from './Nav';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash}/>
      <Route path="nav" component={Nav}>
        <Route path="home" component={Home}></Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
