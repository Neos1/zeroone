/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import styles from './CreateNewQuestion.scss';

class CreateNewQuestionForm extends React.PureComponent {
  static propTypes = {
    activeTab: PropTypes.number.isRequired,
  };

  render() {
    const { props } = this;
    const { activeTab } = props;
    return (
      <div
        className={styles['create-question__form']}
      >
        <Tabs
          selectedIndex={activeTab}
          onSelect={() => {}}
        >
          <TabList className={styles['create-question__tab-list']}>
            <Tab />
            <Tab />
          </TabList>
          <TabPanel>
            first form
          </TabPanel>
          <TabPanel>
            second form
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default CreateNewQuestionForm;
