/*global FB*/
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router';
import '../css/navbar.css';

export default class NavBar extends Component {
  constructor (props) {
    super(props)
    this.goToProfile = this.goToProfile.bind(this)
    this.state = {
      myProfile: `/profile/${localStorage.fb_id}`
    }
  }

  goToProfile (e) {
    let name = this.refs.search.value;
    e.preventDefault()
    axios.get(`http://localhost:8000/profile/${name}`)
    .then((data) => {
      let searchList = data.data.data
      let id = searchList[0].fb_id
      browserHistory.push(`/profile/${id}`)
    })
  }


  logout () {
    localStorage.removeItem('fb_token');
    localStorage.removeItem('fb_id');
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        FB.logout(function(res) {});
      }
    })
  }
  render () {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/home">
            <p>Challenge Accepted</p>
          </Link>
        </div>
        <div className="navbar-header pull-right">
          <form className="navbar-form navbar-left" role="search" onSubmit={(event) => this.goToProfile(event)}>
            <div className="form-group">
              <input ref="search" id="search"  type="text" className="form-control" placeholder="Search User by Name"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <Link className="navbar-brand" to={this.state.myProfile}>
            <p>Profile</p>
          </Link>
          <Link className="navbar-brand" to="/dashboard">
            <p>Dashboard</p>
          </Link>
          <Link className="navbar-brand" to="/challenge">
            <p>Challenge</p>
          </Link>
          <Link className="navbar-brand" onClick={this.logout.bind(this)} href="/home">
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </nav>
    )
  }
}
