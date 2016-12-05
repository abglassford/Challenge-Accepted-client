/*global FB*/
import React, { Component } from 'react';
import NavBar from './NavBar';
// import Footer from './Footer';
import '../css/dashboard.css';
import axios from 'axios';
import { getUserChallenges, getChallengeTemplates, postNewUserChallenge, stepComplete } from '../helpers/helpers.dashboard';

export default class Dashboard extends Component {
  constructor(props, context) {
    super ()
    this.state = {
      challengeTemplates: [],
      fb_id: localStorage.getItem('fb_id'),
      myChallenges: []
    }
    this.accept = this.accept.bind(this)
    this.completeStep = this.completeStep.bind(this)
  }
  componentDidMount () {
    getUserChallenges(this)
    getChallengeTemplates(this);
  }

  accept (template) {
    if (!this.state.myChallenges.length) {
      postNewUserChallenge(this, template)
      .then(() => {
        getUserChallenges(this)
      })
      .catch(err => console.log(err))
    } else {
      let same = false;
      this.state.myChallenges.forEach(challenge => challenge.challenge_id === template.id ? same = true : same = false)
      if (!same) {
        postNewUserChallenge(this, template)
        .then(data => {
          getUserChallenges(this)
        })
      }
    }
  }

  completeStep (challenge) {
    stepComplete(challenge, this)
  }

  share () {
    FB.ui(
     {
      method: 'share',
      href: 'https://developers.facebook.com/docs/'
    }, function(response){
      console.log('this is the response', response);
    });
  }

  render () {
    let progressButton
    return (
      <div className="row">
        <NavBar />
        <div className="avail col-md-3 col-md-offset-1 col-sm-12">
          <h3>Available Challenges</h3>
          <ul>
          {this.state.challengeTemplates.map((chal_temp, i) => {
            return (
              <li key={i} ref={chal_temp.id}>
                <div>
                  <h2>{chal_temp.name} {chal_temp.id}</h2>
                  <p>{chal_temp.description}</p>
                  <p>Points: {chal_temp.points}</p>
                </div>
                <a className="btn btn-success" onClick={(event) => this.accept(chal_temp)}>Accept Challenge!</a>
              </li>
            )
          })}
          </ul>
        </div>
          <div className="your col-md-7 col-sm-12">
            <h3>Your Challenges</h3>
            <ul>
            {this.state.myChallenges.map((mine, i) => {
              if (mine.progress === 10) {
                 progressButton = <a className="btn btn-success">Claim Reward!</a>
              } else {
                progressButton = <a className="btn btn-success" onClick={(event) => this.completeStep(mine)}>Complete Step {mine.progress + 1}</a>
              }
              return (
                <li key={i} ref={mine.id}>
                  <div>
                    <h2>{mine.name} {mine.id}</h2>
                    <p>{mine.description}</p>
                    <p>Points: {mine.points} progress: {mine.progress}</p>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: mine.progress * 10 + '%'}}>
                        <span className="sr-only">60% Complete</span>
                      </div>
                    </div>
                    <a className="btn btn-primary" onClick={this.share.bind(this)}>Share</a>
                    {progressButton}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}
