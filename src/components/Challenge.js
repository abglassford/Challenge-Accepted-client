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
      description: '',
      creator: localStorage.name
    }
  }

  submitForm (e) {
    e.preventDefault()
    let formObj = {
      name: this.refs.name.value,
      points: this.refs.points.value,
      description: this.refs.description.value,
      creator: this.state.creator,
      step1: this.refs.step1.value,
      step2: this.refs.step2.value,
      step3: this.refs.step3.value,
      step4: this.refs.step4.value,
      step5: this.refs.step5.value
    }
    axios.post('http://localhost:8000/challenge_templates', formObj)
    .then(res => browserHistory.push('/dashboard'))
    .catch(err => console.log(err))
  }

  render () {
    console.log(this.state.creator);
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
            <label htmlFor="name">Challenge Name</label>
            <input ref="name" className="form-control" id="name" type="text"></input>
          </div>
          <div className="form-group">
            <label htmlFor="points">Points</label>
            <input ref="points" className="form-control" id="points" type="integer"></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea ref="description" className="form-control" id="description" type="text-area"></textarea>
          </div>
          <hr/>
          <div style={{'overflowY': 'scroll', 'height': '200px'}}>
            <div className="form-group">
              <label htmlFor="step1">Step 1</label>
              <textarea ref="step1" className="form-control" id="step1" type="text-area"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="step2">Step 2</label>
              <textarea ref="step2" className="form-control" id="step2" type="text-area"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="step3">Step 3</label>
              <textarea ref="step3" className="form-control" id="step3" type="text-area"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="step4">Step 4</label>
              <textarea ref="step4" className="form-control" id="step4" type="text-area"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="step5">Step 5</label>
              <textarea ref="step5" className="form-control" id="step5" type="text-area"></textarea>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
        <Footer />
      </div>
    )
  }
}
