/*global FB*/
import React, { Component } from 'react';
import NavBar from './NavBar';
// import Footer from './Footer';
import '../css/dashboard.css';
import axios from 'axios';
import { getUserChallenges, getChallengeTemplates, postNewUserChallenge, stepComplete } from '../helpers/helpers.dashboard';

export default class Dashboard extends Component {
  constructor(props, context) {
    super (props)
    this.state = {
      challengeTemplates: [],
      fb_id: localStorage.getItem('fb_id'),
      myChallenges: [],
    }
    this.temp_display = this.state.challengeTemplates.map(temp => temp)
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
        getChallengeTemplates(this)
        this.state.myChallenges.forEach((challenge, i)=> {
          if (template.id === challenge.id) {
            this.state.challengeTemplates.splice(i, 1)
          }
        })
      })
      .catch(err => console.log(err))
    } else {
      let same = false;
      this.state.myChallenges.forEach(challenge => challenge.challenge_id === template.id ? same = true : console.log(''))
      if (!same) {
        postNewUserChallenge(this, template)
        .then(data => {
          getUserChallenges(this)
          getChallengeTemplates(this)
          this.state.myChallenges.forEach((challenge, i)=> {
            if (template.id === challenge.id) {
              this.state.challengeTemplates.splice(i, 1)
            }
          })
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
            {this.state.myChallenges.sort((a, b) => {
              return a.id - b.id
            })
              .map((challenge, i) => {
              if (challenge.progress === 10) {
                 progressButton = <a className="btn btn-success">Claim Reward!</a>
              } else {
                progressButton = <a className="btn btn-success" onClick={(event) => this.completeStep(challenge)}>Complete Step {challenge.progress + 1}</a>
              }
              return (
                <li key={i} ref={challenge.id}>
                  <div>
                    <h2>{challenge.name} {challenge.id}</h2>
                    <p>{challenge.description}</p>
                    <p>Points: {challenge.points}</p>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: challenge.progress * 10 + '%'}}>
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
