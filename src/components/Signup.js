import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { browserHistory } from 'react-router';
import axios from 'axios';
import '../css/Nav.css'

const signUp = (response) => {
  axios.post('http://localhost:8000/users/new', {
    id: response.id,
    accessToken: response.accessToken,
    fb_obj: JSON.stringify(response)
  })
  .then((data) => {
    console.log(data);
    browserHistory.push('/dashboard')
    console.log(data);
  })
  .catch((err) => {
    browserHistory.push('/signup')
    console.log(err);
  })
}

class Signup extends Component {
  render () {
    return (
      <div className="text-center">
        <h1>We couldn't find you! Sign up with Facebook!</h1>
        <FacebookLogin
        textButton='Register with Facebook!'
        appId="1473688849309792"
        autoLoad={false}
        fields="name,email,picture"
        callback={signUp}
        cssClass="signUp btn btn-primary"/>
      </div>
    );
  }
}


export default Signup;
