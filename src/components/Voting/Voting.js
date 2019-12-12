import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import VotingTop from './VotingTop';
import VotingItem from './VotingItem';
import VotingFilter from './VotingFilter';
import Container from '../Container';
import Footer from '../Footer';
import Pagination from '../Pagination';
import Dialog from '../Dialog/Dialog';
import StartNewVote from '../StartNewVote';

import styles from './Voting.scss';
import PaginationStore from '../../stores/PaginationStore';
import DataManagerStore from '../../stores/DataManagerStore';

// const data = [
//   {
//     title: 'Launch mining farm ',
//     description: 'Some description for voting',
//     actualState: 'progress',
//     date: {
//       start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
//       end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
//     },
//   },
//   {
//     title: 'Withdraw profit',
//     description: 'Some description for voting',
//     actualState: 'pros',
//     date: {
//       start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
//       end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
//     },
//   },
//   {
//     title: 'Stop mining farm',
//     description: 'Some description for voting',
//     actualState: 'cons',
//     date: {
//       start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
//       end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
//     },
//   },
// ];

@inject('dialogStore', 'projectStore')
@observer
class Voting extends React.Component {
  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        votingsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        pagination: PropTypes.instanceOf(PaginationStore).isRequired,
        dataManager: PropTypes.instanceOf(DataManagerStore).isRequired,
      }).isRequired,
    }).isRequired,
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
    const { dialogStore, projectStore: { historyStore: { pagination, dataManager } } } = props;
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
      </Container>
    );
  }
}

export default Voting;
