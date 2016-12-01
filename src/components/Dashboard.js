import React, { Component } from 'react';
import '../css/Dashboard.css'

class Dashboard extends Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="sideBar white-text card blue-grey darken-1 col s4">
            <h1>This is the sidebar</h1>
          </div>
          <div className="main white-text card blue-grey darken-1 col s8">
            <h1>This is the main column</h1>
            <div>
              <ul>
                <li>
                  hey
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
