import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
// import Footer from './Footer';
import '../css/dashboard.css';

export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      userData: []
    }
  }

  componentDidMount () {
    let user = this.props.location.pathname.split('/profile/')[1]
    axios.get(`http://localhost:8000/challenges/allUserData/${user}`)
    .then(res => {
      this.setState({userData: res.data.data})
      console.log(this.state.userData);
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <h1>{this.state.userData.first_name}</h1>
          <div className="row">
            <ul>
              {this.state.userData.map((challenge, i) => {
                return (
                  <li key={i}>{challenge.name}</li>
                )
              })}

            </ul>
          </div>
        </div>
      </div>
  )
  }
}
