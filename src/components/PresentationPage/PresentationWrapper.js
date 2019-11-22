/* eslint-disable react/static-property-placement */
import React from 'react';
import { PropTypes } from 'mobx-react';
import Container from '../Container';
import ToHome from './ToHome';

class PresentationWrapper extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: <div>empty</div>,
  }

  render() {
    const { props } = this;
    return (
      <Container>
        <div
          style={{
            marginTop: '120px',
          }}
        >
          <ToHome />
          <div>
            {props.children}
          </div>
        </div>
      </Container>
    );
  }
}

export default PresentationWrapper;
