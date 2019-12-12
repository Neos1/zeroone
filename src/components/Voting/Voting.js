import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import VotingTop from './VotingTop';
import VotingItem from './VotingItem';
import VotingFilter from './VotingFilter';
import Container from '../Container';
import Footer from '../Footer';
import Pagination from '../Pagination';
import Dialog from '../Dialog/Dialog';
import StartNewVote from '../StartNewVote';
import PaginationStore from '../../stores/PaginationStore';
import DataManagerStore from '../../stores/DataManagerStore';
import CreateGroupQuestions from '../CreateGroupQuestions/CreateGroupQuestions';
import CreateNewQuestion from '../CreateNewQuestion/CreateNewQuestion';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';

import styles from './Voting.scss';
import FinPassForm from '../../stores/FormsStore/FinPassForm';

@withTranslation()
@inject('dialogStore', 'projectStore')
@observer
class Voting extends React.Component {
  passwordForm = new FinPassForm({
    hooks: {
      onSuccess: () => {
        const { props } = this;
        const { dialogStore } = props;
        dialogStore.hide();
        return Promise.resolve();
      },
      onError: () => Promise.reject(),
    },
  });

  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        votingsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        pagination: PropTypes.instanceOf(PaginationStore).isRequired,
        dataManager: PropTypes.instanceOf(DataManagerStore).isRequired,
      }).isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { projectStore } = this.props;
    const {
      historyStore: {
        pagination,
        dataManager,
      },
    } = projectStore;
    pagination.update({
      key: 'activePage',
      value: 1,
    });
    dataManager.reset();
  }

  render() {
    const { props } = this;
    const { t, dialogStore, projectStore: { historyStore: { pagination, dataManager } } } = props;
    const votings = dataManager.list();
    return (
      <Container className="container--small">
        <div
          className={styles['voting-page']}
        >
          <VotingFilter />
          {/* eslint-disable-next-line */}
          <VotingTop onClick={() => { dialogStore.show('start_new_vote'); }} />
          <div>
            {
              votings && votings.length
                ? votings.map((item, index) => (
                  <VotingItem
                    key={`voting__item--${index + 1}`}
                    index={item.id}
                    title={item.caption}
                    description={item.text}
                    actualState={Number(item.status)}
                    date={{ start: Number(item.startTime), end: Number(item.endTime) }}
                  />
                ))
                : null
            }
          </div>
          <Pagination
            activePage={pagination.activePage}
            lastPage={pagination.lastPage}
            handlePageChange={pagination.handleChange}
            itemsCountPerPage={pagination.itemsCountPerPage}
            totalItemsCount={pagination.totalItemsCount}
            pageRangeDisplayed={pagination.pageRangeDisplayed}
          />
        </div>
        <Footer />
        <Dialog
          size="xlg"
          name="start_new_vote"
          header={null}
          footer={null}
        >
          <StartNewVote />
        </Dialog>
        <Dialog name="create_group_question" size="md" footer={null}>
          <CreateGroupQuestions />
        </Dialog>
        <Dialog name="create_question" size="xlg" footer={null}>
          <CreateNewQuestion />
        </Dialog>
        <Dialog
          name="password_form"
          size="md"
          footer={null}
          header={t('fields:enterPassword')}
        >
          <FinPassFormWrapper form={this.passwordForm} />
        </Dialog>
      </Container>
    );
  }
}

export default Voting;
