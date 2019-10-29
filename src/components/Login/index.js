import React, { Component } from 'react';
import Container from '../Container';
import Header from '../Header';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header isMenu />
        <div className="login" />
      </Container>
    );
  }
}

export default Login;
