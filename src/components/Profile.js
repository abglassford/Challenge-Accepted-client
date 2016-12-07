import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import '../css/profile.css';

export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: [],
      userName: '',
      user: localStorage.fb_id,
      searchedId: ''
    }
    this.getProfile = this.getProfile.bind(this)
  }

  componentDidMount () {
    let user = this.state.user;
    axios.get(`http://localhost:8000/challenges/allUserData/${user}`)
    .then(res => {
      let name = res.data.data[0].first_name.charAt(0).toUpperCase() + res.data.data[0].first_name.slice(1)
      this.setState({
        userData: res.data.data,
        userName: `${name}`
      })
    })
  }

  getProfile () {
    let name = this.refs.search.value.toLowerCase();
    axios.get(`http://localhost:8000/profile/${name}`)
    .then((data) => {
      let userId = data.data.data[0].fb_id
      axios.get(`http://localhost:8000/challenges/allUserData/${userId}`)
      .then(res => {
        let userName = res.data.data[0].first_name.charAt(0).toUpperCase() + res.data.data[0].first_name.slice(1)
        this.setState({
          userData: res.data.data,
          userName: `${userName}`,
          searchedId: res.data.data[0].fb_id
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      document.getElementById("notfound").className = 'alert alert-danger col-md-12 text-center visible'
      setTimeout(() => {
        document.getElementById("notfound").className = 'alert alert-danger col-md-12 text-center hidden'
      }, 2000)
    })
    document.getElementById("search").value = "";
  }

  render() {
    let banner
    if(this.state.searchedId) {
      if (this.state.searchedId === this.state.user) {
        banner = <h1>Welcome {this.state.userName}!</h1>
      } else {
        banner = <h1>{this.state.userName}'s Profile</h1>
      }
    } else {
       banner = <h1>Welcome {this.state.userName}!</h1>
    }
    return (
      <div className="row">
        <NavBar/>
        <div className="container">
          <div className="row">
            <div className="user text-center">
              {banner}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="input-group">
                <input ref="search" id="search"  type="text" className="form-control" placeholder="Search User by Name"/>
                <span className="input-group-btn">
                  <button className="btn btn-default" onClick={(event) => this.getProfile()} type="button">Go!</button>
                </span>
              </div>
              <br/>
              <div id="notfound" className="alert alert-danger col-md-12 text-center hidden">
                <strong>User Not Found</strong>
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
                  if (challenge.progress !== 5) {
                    return (
                      <li key={i}>
                        <div>
                          <h2>{challenge.name}<span className="pull-right">{challenge.points} pts</span></h2>
                          <p>{challenge.description}</p>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: challenge.progress * 20 + '%'}}>
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
                <thead>
                  <tr>
                    <th>Challenge Name</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.userData.map((challenge, i) => {
                  if (challenge.progress === 5) {
                    return (
                      <tr key={i}>
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
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
  )
  }
}
