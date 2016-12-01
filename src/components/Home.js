import React, { Component } from 'react';
import '../css/home.css';

export default class Home extends Component {
  render () {
    return (
      <div className="jumbotron banner">
        <div className="banner-content">
          <h4>Accept the Challenge...</h4>
          <h1 className="banner-title">Challenge Accepted!</h1>
          <div className="banner-buttons">
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Sign Up</a></p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Sign In</a></p>
          </div>
        </div>
      </div>
    )
  }
}
