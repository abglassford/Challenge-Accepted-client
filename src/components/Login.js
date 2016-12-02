import React, { PropTypes as T } from 'react'
import { Button } from 'react-bootstrap'
import AuthService from '../utils/AuthService'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  auth = new AuthService('mlbGKlnsQ4HREGTkak1GI9oTnnWHCUgw', 'abglassford.auth0.com')
  render() {
    return <Button bsStyle="primary" onClick={this.auth.login.bind(this)}>Login</Button>
  }
}

export default Login;
