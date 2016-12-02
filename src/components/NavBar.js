/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/navbar.css';

export default class NavBar extends Component {
  logout () {
    localStorage.removeItem('fb_token')
    FB.getLoginStatus(function(response) {
      console.log(response);
      if (response && response.status === 'connected') {
        FB.logout(function(res) {});
      }
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
        </div>
        <div className="navbar-header pull-right">
          <Link className="navbar-brand" to="/dashboard">
            <p>Dashboard</p>
          </Link>
          <Link className="navbar-brand" to="/challenge">
            <p>Challenge</p>
          </Link>
          <Link className="navbar-brand" onClick={this.logout.bind(this)} href="/home">
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </nav>
    )
  }
}
