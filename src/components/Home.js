/*global FB*/
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import '../css/home.css';

const responseFacebook = (response) => {
  localStorage.setItem('fb_token', response.accessToken)
  console.log(localStorage.getItem('fb_token'));
  FB.api('/me', {fields: 'first_name, last_name, picture, email'}, function(response) {
    console.log(response);
  });
  browserHistory.push('/dashboard')
}

export default class Home extends Component {
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
    let status
    if(localStorage.getItem('fb_token')){
      status = (
        <div>
          <Link className="btn btn-warning dash" to="/dashboard">Dashboard</Link>
          <Link className="btn btn-danger logout" onClick={this.logout.bind(this)} href="/home">Logout</Link>
        </div>
      )
    } else {
      status = <FacebookLogin
        isDisabled={false}
        appId="1473688849309792"
        fields="first_name,last_name,email,picture"
        callback={responseFacebook}
        cssClass="btn btn-primary"/>
    }
    return (
      <div className="jumbotron banner">
        <div className="banner-content">
          <h4>Accept the Challenge...</h4>
          <h1 className="banner-title">Challenge Accepted!</h1>
          <div className="banner-buttons">
            {status}
          </div>
        </div>
      </div>
    )
  }
}
