import React, { Component } from 'react';

export default class SignIn extends Component {

  dothething () {

    console.log('OH HAI');
  }

  render () {
    return (
      <p><a className="btn btn-primary btn-lg" onClick={this.dothething.bind(this)}role="button">Sign In</a></p>
    )
  }
}
