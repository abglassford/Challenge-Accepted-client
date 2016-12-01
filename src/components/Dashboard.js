import React, { Component } from 'react';
import NavBar from './NavBar';

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <h1>This is the dashboard</h1>
      </div>
    )
  }
}
