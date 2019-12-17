import React from 'react';
import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Voting from '.';
import VotingInfoWrapper from './VotingInfoWrapper';

@inject('projectStore')
class VotingRoute extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        resetFilter: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { projectStore } = this.props;
    const {
      historyStore: {
        resetFilter,
      },
    } = projectStore;
    resetFilter();
  }

  render() {
    const { props } = this;
    const { match } = props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={Voting} />
        <Route path={`${match.path}/info/:id`} component={withRouter(VotingInfoWrapper)} />
      </Switch>
    );
  }
}

export default VotingRoute;
