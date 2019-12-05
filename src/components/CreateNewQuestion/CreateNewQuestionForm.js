/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import { withTranslation } from 'react-i18next';
import Input from '../Input';
import CreateQuestionBasicForm from '../../stores/FormsStore/CreateQuestionBasicForm';
import { TokenName, DateIcon } from '../Icons';
import InputTextarea from '../Input/InputTextarea';
import Button from '../Button/Button';

import 'react-tabs/style/react-tabs.css';
import styles from './CreateNewQuestion.scss';

@withTranslation('buttons')
class CreateNewQuestionForm extends React.PureComponent {
  formBasic = new CreateQuestionBasicForm({
    hooks: {
      onSuccess() {
        return Promise.resolve();
      },
      onError() {
        /* eslint-disable-next-line */
        console.error('error');
      },
    },
  })

  static propTypes = {
    /** Current active tab */
    activeTab: PropTypes.number.isRequired,
    /** Method called on toggle tab */
    onToggle: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  onBasicSubmit = () => {
    const { props } = this;
    const { onToggle } = props;
    onToggle(1);
  }

  render() {
    const { props, formBasic } = this;
    const { activeTab, t } = props;
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
            <form form={formBasic} onSubmit={this.onBasicSubmit}>
              <div className={styles['create-question__form-row']}>
                <div className={styles['create-question__form-col']}>
                  <Input field={formBasic.$('question_title')}>
                    <TokenName />
                  </Input>
                </div>
                <div className={styles['create-question__form-col']}>
                  <Input field={formBasic.$('question_life_time')}>
                    <DateIcon />
                  </Input>
                </div>
              </div>
              <div className={styles['create-question__form-row']}>
                <div className={styles['create-question__form-col']}>
                  <Input field={formBasic.$('param_question')}>
                    <TokenName />
                  </Input>
                </div>
                <div className={styles['create-question__form-col']}>
                  <Input field={formBasic.$('voting_formula')}>
                    <TokenName />
                  </Input>
                </div>
              </div>
              <div className={styles['create-question__form-row']}>
                <div
                  className={`
                    ${styles['create-question__form-col']}
                    ${styles['create-question__form-col--full']}
                  `}
                >
                  <InputTextarea
                    field={formBasic.$('description')}
                  />
                </div>
              </div>
              <div className={styles['create-question__form-row']}>
                <div className={styles['create-question__form-col']} />
                <div className={styles['create-question__form-col']}>
                  <Button type="submit">{t('buttons:nextStep')}</Button>
                </div>
              </div>
            </form>
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
