import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CreateNewProjectWithTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        CreateNewProjectWithTokens
        <NavLink to="/uploading">upload</NavLink>
      </div>
    );
  }
}

export default CreateNewProjectWithTokens;
