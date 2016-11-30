import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { browserHistory } from 'react-router';
import axios from 'axios';
import '../css/Splash.css';

const responseFacebook = (response) => {
  console.log(response);
  axios.post('https://rocky-thicket-61690.herokuapp.com/users', response)
  .then((data) => {
    browserHistory.push('/dashboard')
    console.log(data);
  })
  .catch((err) => {
    browserHistory.push('/signup')
    console.log(err);
  })
}

class Splash extends Component {
  render () {
    return (
      <div className="splash jumbotron jumbotron-fluid text-center">
        <h1>Splash!</h1>
        <FacebookLogin
        appId="1473688849309792"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="signUp btn btn-primary navbar-btn"/>
      </div>
    );
  }
}

export default Splash;
