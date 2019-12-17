import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Questions from '.';
import FullQuestion from './FullQuestion';

@inject('projectStore')
class QuestionsRoute extends React.Component {
  static propTypes = {
    projectStore: PropTypes.shape({
      questionStore: PropTypes.shape({
        resetFilter: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  componentDidMount() {
    const { projectStore } = this.props;
    const {
      questionStore: {
        resetFilter,
      },
    } = projectStore;
    resetFilter();
  }

  render() {
    return (
      <Switch>
        <Route path="/questions" exact component={Questions} />
        <Route path="/questions/:id" exact component={FullQuestion} />
      </Switch>
    );
  }
}

export default QuestionsRoute;
