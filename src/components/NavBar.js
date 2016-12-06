/*global FB*/
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import '../css/navbar.css';

export default class NavBar extends Component {
  constructor (props) {
    super(props)
    this.goToProfile = this.goToProfile.bind(this)
  }

  goToProfile (e) {
    let query = this.refs.search.value;
    e.preventDefault()
    axios.get(`http://localhost:8000/users/${query}`)
    .then((data) => {
      console.log(data);
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
              <input ref="search" id="search"  type="text" className="form-control" placeholder="Search"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
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
