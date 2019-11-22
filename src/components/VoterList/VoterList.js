/* eslint-disable react/static-property-placement */
import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import VoterListTable from './VoterListTable';

import 'react-tabs/style/react-tabs.css';
import styles from './VoterList.scss';

@withTranslation()
class VoterList extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <div className={styles['voter-list']}>
        <Tabs>
          <div className={styles['voter-list__top']}>
            <div className={styles['voter-list__title']}>
              {t('other:voterList')}
            </div>
            <TabList className={styles['voter-list__tab-list']}>
              <Tab
                className={styles['voter-list__tab']}
                selectedClassName={styles['voter-list__tab--selected']}
              >
                {t('other:agree')}
              </Tab>
              <Tab
                className={styles['voter-list__tab']}
                selectedClassName={styles['voter-list__tab--selected']}
              >
                {t('other:against')}
              </Tab>
            </TabList>
          </div>
          <div className={styles['voter-list__content']}>
            <TabPanel>
              <VoterListTable
                list={[
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                    isAdmin: true,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 2,
                  },
                ]}
              />
            </TabPanel>
            <TabPanel>
              <VoterListTable
                list={[]}
              />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default VoterList;
