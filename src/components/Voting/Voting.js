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

const data = [
  {
    title: 'Launch mining farm ',
    description: 'Some description for voting',
    actualState: 'progress',
    date: {
      start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
      end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
    },
  },
  {
    title: 'Withdraw profit',
    description: 'Some description for voting',
    actualState: 'pros',
    date: {
      start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
      end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
    },
  },
  {
    title: 'Stop mining farm',
    description: 'Some description for voting',
    actualState: 'cons',
    date: {
      start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
      end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
    },
  },
];

@inject('dialogStore')
@observer
class Voting extends React.Component {
  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { props } = this;
    const { dialogStore } = props;
    console.log(dialogStore);
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
              data && data.length
                ? data.map((item, index) => (
                  <VotingItem
                    key={`voting__item--${index + 1}`}
                    index={index + 1}
                    title={item.title}
                    description={item.description}
                    actualState={item.actualState}
                    date={item.date}
                  />
                ))
                : null
            }
          </div>
          <Pagination
            activePage={1}
            lastPage={10}
            handlePageChange={() => {}}
            itemsCountPerPage={10}
            totalItemsCount={100}
            pageRangeDisplayed={5}
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
