/*global FB*/
import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default class Dashboard extends Component {
  constructor(props, context) {
    super ()
    this.state = {
      challengeData: [],
    }
  }
  componentDidMount () {
    FB.api('/me', {fields: 'first_name, last_name, picture, email'}, function(response) {
      console.log('this is dashboard', response);
    })
  }
  
  render () {
    return (
      <div className="row">
        <NavBar />
        <div className="col-md-3 col-md-offset-1">
          <h3>this is the sidebar</h3>
        </div>
          <div className="col-md-7">
            <h3>This is the main article</h3>
          <ul>
          {this.state.challengeData.map((challenge, i) => {
            return (
              <li key={i}>
                <div>
                  <h2>{challenge.name}</h2>
                  <p>{challenge.description}</p>
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
