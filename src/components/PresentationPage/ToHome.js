import React from 'react';
import { Link } from 'react-router-dom';

class ToHome extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/">На главную</Link>
      </div>
    );
  }
}

export default ToHome;
