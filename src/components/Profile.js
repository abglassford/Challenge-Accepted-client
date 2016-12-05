import React, { Component } from 'react';
import NavBar from './NavBar';
// import Footer from './Footer';
import '../css/dashboard.css';

export default class Profile extends Component {

  render() {
    return (
      <div>
        <NavBar />
        This is the Profile Page
      </div>
  )
  }
}
