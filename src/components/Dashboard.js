/*global FB*/
import React, { Component } from 'react';
import NavBar from './NavBar';
// import Footer from './Footer';
import '../css/dashboard.css';
// import axios from 'axios';
import { postNewUserChallenge, stepComplete, getData } from '../helpers/helpers.dashboard';

export default class Dashboard extends Component {
  constructor(props, context) {
    super (props)
    this.state = {
      challengeTemplates: [],
      fb_id: localStorage.getItem('fb_id'),
      myChallenges: [],
    }
    this.accept = this.accept.bind(this)
    this.completeStep = this.completeStep.bind(this)
  }
  componentDidMount () {
    getData(this)
  }

  accept (template) {
    if (!this.state.myChallenges.length) {
      postNewUserChallenge(this, template)
      .then(() => {
        getData(this)
        this.state.myChallenges.forEach((challenge, i) => {
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
          getData(this)
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
    console.log(challenge);
    stepComplete(challenge, this)
  }

  completeChallenge (challenge) {
    console.log(challenge);
  }

  share () {
    FB.ui(
     {
      method: 'share',
      href: 'https://www.google.com'
    }, function(response) {
      console.log('this is the response', response);
    });
  }

  render () {
    let progressButton
    let steps = []
    let step
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
                  <h2>{chal_temp.name}</h2>
                  <p>{chal_temp.description}</p>
                  <p>Points: {chal_temp.points}</p>
                  <p>Created By: {chal_temp.creator}</p>
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
                steps.push([challenge.step1, challenge.step2, challenge.step3, challenge.step4, challenge.step4])
              if (challenge.progress === 5) {
                step = <p>All Steps Completed!</p>
                 progressButton = <a className="btn btn-success" onClick={(event) => this.completeChallenge(challenge)}>Complete Challenge!</a>
              } else {
                step = <p>Step {challenge.progress + 1}: {steps[i][challenge.progress + 1]}</p>
                progressButton = <a className="btn btn-success" onClick={(event) => this.completeStep(challenge)}>Complete Step {challenge.progress + 1}</a>
              }
              return (

                <li key={i} ref={challenge.id}>
                  <div>
                    <h2>{challenge.name}</h2>
                    <p>{challenge.description}</p>
                    <p>Points: {challenge.points}</p>
                    {step}
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: challenge.progress * 20 + '%'}}>
                      </div>
                    </div>
                    <a className="btn btn-primary" onClick={this.share.bind(this)}>Share to Facebook</a>
                    {progressButton}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
