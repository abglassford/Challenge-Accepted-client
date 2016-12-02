import React, { Component } from 'react';
import {Link } from 'react-router';
import Logout from './Logout';


export default class NavBar extends Component {

  render () {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/home">
            <p>Challenge Accepted</p>
          </Link>
          <ul className="nav navbar-nav">
            <li><Logout /></li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}
