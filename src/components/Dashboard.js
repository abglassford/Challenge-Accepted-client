/*global FB*/
import React, { Component } from 'react';
import NavBar from './NavBar';
// import Footer from './Footer';
import axios from 'axios';
import '../css/dashboard.css';

export default class Dashboard extends Component {
  constructor(props, context) {
    super ()
    this.state = {
      challengeTemplates: [],
      fb_id: localStorage.getItem('fb_id'),
      myChallenges: []
    }
    this.accept = this.accept.bind(this)
  }
  componentDidMount () {
    axios.get(`http://localhost:8000/challenges/userChallenge/${localStorage.getItem('fb_id')}`)
    .then(response => {
      this.setState({myChallenges: response.data.data})
    })
    axios.get('http://localhost:8000/challenge_templates')
    .then((res) => {
      this.setState({challengeTemplates: res.data.data})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  accept (challengeTemplate) {
    if (!this.state.myChallenges.length) {
      axios.post('http://localhost:8000/challenges', {
        user_id: this.state.fb_id,
        challenge_id: challengeTemplate.id,
        completed: false,
        progress: 0.00
      })
      .then(() => {
        axios.get(`http://localhost:8000/challenges/userChallenge/${localStorage.getItem('fb_id')}`)
        .then(response => {
          this.setState({myChallenges: response.data.data})
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    } else {
      let same = false;
      this.state.myChallenges.forEach(challenge => challenge.challenge_id === challengeTemplate.id ? same = true : same = false)
      if (!same) {
        axios.post('http://localhost:8000/challenges', {
          user_id: this.state.fb_id,
          challenge_id: challengeTemplate.id,
          completed: false,
          progress: 0.00
        })
        .then(data => {
          axios.get(`http://localhost:8000/challenges/userChallenge/${localStorage.getItem('fb_id')}`)
          .then(response => {
            this.setState({myChallenges: response.data.data})
          })
        })
      }
    }
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
              return (
                <li key={i} ref={mine.id}>
                  <div>
                    <h2>{mine.name} {mine.id}</h2>
                    <p>{mine.description}</p>
                    <p>Points: {mine.points}</p>
                    <p>Progress: {mine.progress}/10</p>
                    <a onClick={this.share.bind(this)}>Share</a>
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
