import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import styles from './VoterList.scss';

class VoterList extends React.PureComponent {
  render() {
    return (
      <div className={styles['voter-list']}>
        <Tabs>
          <div className={styles['voter-list__top']}>
            <div className={styles['voter-list__title']}>
              Список проголосовавших
            </div>
            <TabList className={styles['voter-list__tab-list']}>
              <Tab
                className={styles['voter-list__tab']}
                selectedClassName={styles['voter-list__tab--selected']}
              >
                Согласны
              </Tab>
              <Tab
                className={styles['voter-list__tab']}
                selectedClassName={styles['voter-list__tab--selected']}
              >
                Против
              </Tab>
            </TabList>
          </div>
          <div className={styles['voter-list__content']}>
            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default VoterList;
