import React, { Component } from 'react'

export class Login extends Component {

  render() {
    const login = this.props.routes[0].auth.login
    return (
      <div>
        <h2>Login</h2>
        <button className="blue waves-effect waves-light btn" onClick={login.bind(this)}>Login</button>
      </div>
    )
  }
}

export default Login;
