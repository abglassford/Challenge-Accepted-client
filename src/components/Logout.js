import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import AuthService from '../utils/AuthService';

export default class Logout extends Component {
  auth = new AuthService('mlbGKlnsQ4HREGTkak1GI9oTnnWHCUgw', 'abglassford.auth0.com')
  logout () {
    this.auth.logout();
    browserHistory.replace('/home');
  }
  render () {
    return (
      <a onClick={this.logout.bind(this)}>Logout</a>
    )
  }
}
