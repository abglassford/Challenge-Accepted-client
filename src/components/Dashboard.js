import React, { Component } from 'react';

class Dashboard extends Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center">
            <h1>This is the dashboard</h1>
            <h2>You've successfully logged in!</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
