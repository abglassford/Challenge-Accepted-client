import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Challenge extends Component {
  render () {
    return (
      <div className="text-center">
        <h1>This is the challenge page</h1>
      </div>
    );
  }
}


export default Challenge;
