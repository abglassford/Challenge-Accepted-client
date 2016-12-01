import React, { Component } from 'react';
import axios from 'axios';
import '../css/Dashboard.css'

class Dashboard extends Component {
  constructor () {
    super ()
    this.state = { challengeData: [] };
    axios.get('http://localhost:8000/challenges')
    .then((data) => {
      this.setState({ challengeData: data.data.data})
    })
  }
  render () {
    return (
      <div className="main container-fluid col">
        <div className="row">
          <div className="sideBar white-text card blue-grey col s3">
            <h1>This is the sidebar menu</h1>
          </div>
          <div className="section white-text card blue-grey col s8 offset-s1">
            <h1>This is where a list of your current challenges will go</h1>
            <div>
              <ul>
                {this.state.challengeData.map((challenge, i) => {
                  return (
                  <li key={i}>
                    <div className="challenge card blue white-text">
                      <div className="container-fluid">
                        <h4 className="display-3">{challenge.name}</h4>
                        <h6>Points: {challenge.points}</h6>
                        <p>{challenge.description}</p>
                      </div>
                    </div>
                  </li>
                )})}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
