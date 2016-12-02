/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

export default class NavBar extends Component {
  logout () {
    localStorage.removeItem('fb_token')
    FB.getLoginStatus(function(response) {
      console.log(response);
      if (response && response.status === 'connected') {
        FB.logout(function(res) {});
      }
      location.reload(true)
      browserHistory.push('/home');
    })
  }
  render () {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/home">
            <p>Challenge Accepted</p>
          </Link>
          <ul className="nav navbar-nav">
            <li><a onClick={this.logout.bind(this)}>this is a logout button</a></li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}
