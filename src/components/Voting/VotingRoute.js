import React from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Voting from '.';
import VotingInfoWrapper from './VotingInfoWrapper';

const VotingRoute = ({
  match,
}) => (
  <>
    <Route exact path={`${match.path}`} component={Voting} />
    <Route path={`${match.path}/info/:id`} component={withRouter(VotingInfoWrapper)} />
  </>
);

VotingRoute.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default VotingRoute;
