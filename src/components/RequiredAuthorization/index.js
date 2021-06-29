import React from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@inject('userStore')
@observer
class RequiredAuthorization extends React.Component {
  render() {
    const { props } = this;
    const { userStore, children } = props;
    if (!userStore.authorized) return <Redirect to="/" />;
    return children;
  }
}

RequiredAuthorization.propTypes = {
  children: propTypes.node.isRequired,
  userStore: propTypes.shape({
    authorized: propTypes.bool.isRequired,
  }).isRequired,
};

export default RequiredAuthorization;
