import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/Nav.css'



class Nav extends Component {
  render () {
    return (
      <div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Challenge Accepted</Link>
          </div>
          <div className="signDiv pull-right">

          </div>
        </div>
      </nav>
      <div>{this.props.children}</div>
    </div>
  );
  }
}

export default Nav;
