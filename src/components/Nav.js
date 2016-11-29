import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router';
import '../css/Nav.css'

const responseFacebook = (response) => {
  console.log(response);
}

class Nav extends Component {
  render () {
    return (
      <div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/home" className="navbar-brand">Challenge Accepted</Link>
          </div>
          <div className="signDiv pull-right">
            <FacebookLogin
            appId="1473688849309792"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="signUp btn btn-primary navbar-btn" />
          </div>
        </div>
      </nav>
      <div>{this.props.children}</div>
    </div>
  );
  }
}

export default Nav;
