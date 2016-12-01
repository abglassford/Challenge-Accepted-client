import React, { Component } from 'react';
import NavBar from './NavBar';

export default class Home extends Component {
  constructor () {
    super ()
  }

  render () {
    return (
      <div>
        <NavBar />
        <h1>Hey</h1>
      </div>
    )
  }
}
