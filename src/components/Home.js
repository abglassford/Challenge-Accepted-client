import React, { Component } from 'react';
import { Link } from 'react-router';
import SignIn from './SignIn';
import '../css/home.css';

export default class Home extends Component {
  render () {
    return (
      <div className="jumbotron banner">
        <div className="banner-content">
          <h4>Accept the Challenge...</h4>
          <h1 className="banner-title">Challenge Accepted!</h1>
          <div className="banner-buttons">
            <p><Link className="btn btn-primary btn-lg" to="/signup" role="button">Sign Up</Link></p>
            <SignIn />
          </div>
        </div>
      </div>
    )
  }
}
