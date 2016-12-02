/*global FB*/
import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props, context) {
    super ()
    this.state = {
      challengeData: [],
    }
  }
  componentDidMount () {
    if(!localStorage.getItem('fb_token')){
      FB.api('/me', {fields: 'first_name, last_name, picture, email'}, function(response) {
      })
    }
    axios.get('http://localhost:8000/challenges')
    .then((res) => {
      console.log('this is res', res);
      this.setState({challengeData: res.data.data})
    })
  }

  render () {
    return (
      <div className="row">
        <NavBar />
        <div className="col-md-3 col-md-offset-1">
          <h3>Your Challenges</h3>
        </div>
          <div className="col-md-7">
            <h3>Available Challenges</h3>
          <ul>
          {this.state.challengeData.map((challenge, i) => {
            return (
              <li key={i}>
                <div>
                  <h2>{challenge.name}</h2>
                  <p>{challenge.description}</p>
                  <p>Points: {challenge.points}</p>
                  <p>Progress: {challenge.progress}/10</p>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}
