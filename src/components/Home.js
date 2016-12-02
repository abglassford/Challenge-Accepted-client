import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import '../css/home.css';

const responseFacebook = (response) => {
  localStorage.setItem('fb_token', response.accessToken)
  console.log(response);
  browserHistory.push('/dashboard')
}

export default class Home extends Component {
  render () {
    let button
    if(localStorage.getItem('fb_token')){
      button = <Link to="/dashboard"><button className="btn btn-warning">Dashboard</button></Link>
    } else {
      button = <FacebookLogin
        isDisabled={false}
        appId="1473688849309792"
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="btn btn-primary"/>
    }
    return (
      <div className="jumbotron banner">
        <div className="banner-content">
          <h4>Accept the Challenge...</h4>
          <h1 className="banner-title">Challenge Accepted!</h1>
          <div className="banner-buttons">
            {button}
          </div>
        </div>
      </div>
    )
  }
}
