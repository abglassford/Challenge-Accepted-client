import React, { Component } from 'react';

export default class Home extends Component {
  constructor () {
    super ()
  }

  render () {
    return (
      <div className="jumbotron">
        <h1>Hello, world!</h1>
        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
      </div>
    )
  }
}
