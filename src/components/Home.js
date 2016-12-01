import React, { Component } from 'react';
import '../css/home.css';

export default class Home extends Component {
  render () {
    return (
      <div className="jumbotron banner">
        <div className="banner-content">
          <h4>Accept the Challenge...</h4>
          <h1 className="banner-title">Challenge Accepted!</h1>
          <p className="banner-button"><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
        </div>
      </div>
    )
  }
}
