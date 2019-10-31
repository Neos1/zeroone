import React from 'react';
import { NavLink } from 'react-router-dom';

const CreateNewProject = () => (
  <div>
      CreateNewProject
    <NavLink to="/addExisting"> существующий </NavLink>
    <NavLink to="/newProject"> новый </NavLink>
  </div>
);

export default CreateNewProject;
