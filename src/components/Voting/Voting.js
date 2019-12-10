import React from 'react';
import VotingTop from './VotingTop';
import VotingItem from './VotingItem';

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

class Voting extends React.PureComponent {
  render() {
    return (
      <div
        className={styles['voting-page']}
      >
        <div>
          filter
        </div>
        {/* eslint-disable-next-line */}
        <VotingTop onClick={() => { console.log('voting top click'); }} />
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
        <div>
          pagination
        </div>
      </div>
    );
  }
}

export default Voting;
