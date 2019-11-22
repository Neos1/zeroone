/* eslint-disable react/static-property-placement */
import React from 'react';
import { Link } from 'react-router-dom';
import PresentationWrapper from './PresentationWrapper';

class PresentationPage extends React.PureComponent {
  render() {
    return (
      <PresentationWrapper>
        <ul style={{ marginTop: '20px' }}>
          <li><Link to="/pagination">Пагинация</Link></li>
          <li><Link to="/modals">Модальные окна</Link></li>
          <li><Link to="/members">Участники</Link></li>
        </ul>
      </PresentationWrapper>
    );
  }
}

export default PresentationPage;
