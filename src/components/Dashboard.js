import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default class Dashboard extends Component {
  constructor(props, context) {
    super()
  }

  render () {
    return (
      <div>
        <NavBar />
        <h1>This is the dashboard</h1>

        <Footer />
      </div>
    )
  }
}
