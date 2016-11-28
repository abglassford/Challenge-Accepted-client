import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './App.css';

const responseFacebook = (response) => {
  console.log(response);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <FacebookLogin
          appId="1473688849309792"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook} />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
