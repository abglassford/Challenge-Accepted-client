import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default class Challenge extends Component {
  render () {
    return (
      <div className="row"> 
        <NavBar />
        <h1>This is the challenge page</h1>
        <Footer />
      </div>
    )
  }
}
