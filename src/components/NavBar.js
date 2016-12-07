/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/navbar.css';

export default class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myProfile: `/profile/${localStorage.fb_id}`
    }
  }

  logout () {
    localStorage.removeItem('fb_token');
    localStorage.removeItem('fb_id');
    FB.getLoginStatus(function(response) {
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
          <Link className="navbar-brand" to={this.state.myProfile}>
            <p>Profile</p>
          </Link>
          <Link className="navbar-brand" to="/challenge">
            <p>Challenge</p>
          </Link>
          <Link className="navbar-brand" onClick={this.logout.bind(this)} to="/home">
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </nav>
    )
  }
}
