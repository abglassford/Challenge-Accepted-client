import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/Nav.css'



class Nav extends Component {
  constructor (props) {
    super()
    this.state = {
      page: 'Splash',
      count: 0
    }
  }
  counter () {
    this.setState({count: this.state.count += 1})
  }

  render () {
    let message
    if(this.state.count > 5) {
      message = 'everything is wrong'
    } else {
      message = 'everything is alright'
    }
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Challenge Accepted</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href='#' onClick={this.counter.bind(this)}>{message}</a></li>
            </ul>
          </div>
        </nav>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Nav;
