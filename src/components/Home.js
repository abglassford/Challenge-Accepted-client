/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { removeToken, checkUserExists } from '../helpers/helpers.home';
import '../css/home.css';

const responseFacebook = (response) => {
  checkUserExists(response)
}

export default class Home extends Component {
  logout () {
    removeToken()
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        FB.logout();
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
