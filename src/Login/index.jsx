import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <div id="login" className="login-wrapper">
        <h1 className="headline">Just a demo</h1>
        <LoginForm />
			</div>
    );
  }
};
