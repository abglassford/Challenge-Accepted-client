import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';

export default class Challenge extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      points: '',
      description: ''
    }
  }

  submitForm (e) {
    e.preventDefault()
    let formObj = {
      name: this.refs.name.value,
      points: this.refs.points.value,
      description: this.refs.description.value
    }
    axios.post('http://localhost:8000/challenge_templates', formObj)
    .then(res => browserHistory.push('/dashboard'))
  }

  render () {
    return (
      <div className="row">
        <NavBar />
        <div className="col-md-12 text-center">
          <h1>Create a Challenge!</h1>
          <br/>
        </div>
        <div className="col-md-6 col-md-offset-3">
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input ref="name" className="form-control" id="name" type="text"></input>
          </div>
          <div className="form-group">
            <label htmlFor="points">points</label>
            <input ref="points" className="form-control" id="points" type="integer"></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <textarea ref="description" className="form-control" id="description" type="text-area"></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
        <Footer />
      </div>
    )
  }
}
