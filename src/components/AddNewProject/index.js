import React from 'react';
import { NavLink } from 'react-router-dom';


const AddNewProject = () => (
  <div>
      AddNewProject
    <NavLink to="/createWithTokens">With tokens</NavLink>
    <NavLink to="/createWithoutTokens">Without tokens</NavLink>
  </div>
);

export default AddNewProject;
