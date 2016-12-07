import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import '../css/dashboard.css';

export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: [],
      user: localStorage.fb_id
    }
    this.getProfile = this.getProfile.bind(this)
  }

  componentDidMount () {
    let user = this.state.user;
    axios.get(`http://localhost:8000/challenges/allUserData/${user}`)
    .then(res => {
      this.setState({userData: res.data.data})
      console.log(this.state.userData);
    })
  }

  getProfile () {
    let name = this.refs.search.value;
    axios.get(`http://localhost:8000/profile/${name}`)
    .then((data) => {
      let userId = data.data.data[0].fb_id
      axios.get(`http://localhost:8000/challenges/allUserData/${userId}`)
      .then(res => {
        this.setState({userData: res.data.data})
        console.log(this.state.userData);
      })
    })
    document.getElementById("search").value = "";
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="input-group">
                <input ref="search" id="search"  type="text" className="form-control" placeholder="Search User by Name"/>
                <span className="input-group-btn">
                  <button className="btn btn-default" onClick={(event) => this.getProfile()} type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>
          <h1>{this.state.userData.first_name}</h1>
          <div className="row">
            <div className="col-md-6">
              <h2>Challenges In Progress</h2>
              <hr/>
              <ul>
                {this.state.userData.map((challenge, i) => {
                  if (challenge.progress !== 10) {
                    return (
                      <li key={i}>
                        <div>
                          <h2>{challenge.name}</h2>
                          <p>{challenge.description}</p>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: challenge.progress * 10 + '%'}}>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            </div>
            <div className="col-md-6">
              <h2>Completed Challenges</h2>
              <hr/>
              <table className='table'>
                <tr>
                  <th>Challenge Name</th>
                  <th>Points</th>
                </tr>
                {this.state.userData.map((challenge, i) => {
                  if (challenge.progress === 10) {
                    return (
                      <tr>
                        <td>
                          <h2>{challenge.name}</h2>
                          <p>{challenge.description}</p>
                        </td>
                        <td>
                          <h2>{challenge.points}</h2>
                        </td>
                      </tr>
                    )
                  }
                  return null

                })}
              </table>
            </div>

          </div>
        </div>
      </div>
  )
  }
}
