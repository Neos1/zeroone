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
import { observer } from 'mobx-react';
import Input from '../Input';
import CreateQuestionBasicForm from '../../stores/FormsStore/CreateQuestionBasicForm';
import CreateQuestionDynamicForm from '../../stores/FormsStore/CreateQuestionDynamicForm';
import { TokenName, DateIcon } from '../Icons';
import InputTextarea from '../Input/InputTextarea';
import Button from '../Button/Button';
import Dropdown from '../Dropdown';

import 'react-tabs/style/react-tabs.css';
import styles from './CreateNewQuestion.scss';

@withTranslation('buttons')
@observer
class CreateNewQuestionForm extends React.PureComponent {
  /** Form with basic info for new question */
  formBasic = new CreateQuestionBasicForm({
    hooks: {
      onSuccess: () => {
        this.onBasicSubmit();
        return Promise.resolve();
      },
      onError: () => {
        console.log('error');
      },
    },
  })

  /** Form with additional info for new question */
  formDynamic = new CreateQuestionDynamicForm({
    hooks: {
      onSuccess: () => {
        this.onDynamicSubmit();
        return Promise.resolve();
      },
      onError: () => {
        console.log('error');
      },
    },
  });

  static propTypes = {
    /** Current active tab */
    activeTab: PropTypes.number.isRequired,
    /** Method called on toggle tab */
    onToggle: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  /** Action on basic form submit */
  onBasicSubmit = () => {
    const { props } = this;
    const { onToggle } = props;
    onToggle(1);
  }

  /** Action on dynamic form submit */
  onDynamicSubmit = () => {
    console.log('dynamic submit');
  }

  /**
   * Method for getting correct row index
   * for dynamic fields
   *
   * @param {number} index number for convert
   * @returns {number} row index
   */
  getRowIndex = (index) => (
    Math.floor(index / 2)
  )

  /**
   * Method for adding new fields (input & select)
   * to dynamic form
   */
  addDynamicFields = () => {
    const { props, formDynamic } = this;
    const { t } = props;
    const rowIndex = this.getRowIndex(formDynamic.fields.size);
    // Add input field
    formDynamic.add({
      name: `param_input--${rowIndex}`,
      type: 'text',
      label: 'parameter',
      placeholder: t('fields:enterNewParameterName'),
      rules: 'required',
    });
    // Add select field
    formDynamic.add({
      name: `param_select--${rowIndex}`,
      type: 'text',
      label: 'parameter',
      placeholder: t('fields:selectParameterType'),
      rules: 'required',
    });
  }

  render() {
    const { props, formBasic, formDynamic } = this;
    const { activeTab, t, onToggle } = props;
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
            <form
              form={formBasic}
              onSubmit={formBasic.onSubmit}
              className={styles['create-question__form--basic']}
            >
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
            <form
              form={formDynamic}
              onSubmit={formDynamic.onSubmit}
              className={styles['create-question__form--dynamic']}
            >
              {/* Render dynamic fields start */}
              {
                formDynamic.map((field, index) => {
                  const rowIndex = this.getRowIndex(index);
                  // Since two fields are added at a time,
                  // duplicates need to be excluded
                  // @see addDynamicFields method
                  if (Number.isInteger(index / 2) === false) return null;
                  return (
                    <div className={styles['create-question__form-row']} key={rowIndex}>
                      <div className={styles['create-question__form-col']}>
                        <Input field={formDynamic.$(`param_input--${rowIndex}`)}>
                          <TokenName />
                        </Input>
                      </div>
                      <div className={styles['create-question__form-col']}>
                        <Dropdown
                          options={[{ label: 'String', value: 'string' }]}
                          field={formDynamic.$(`param_select--${rowIndex}`)}
                          onSelect={() => {}}
                        >
                          <TokenName />
                        </Dropdown>
                      </div>
                    </div>
                  );
                })
              }
              {/* Render dynamic fields end */}
              <div className={styles['create-question__form-row']}>
                <div className={styles['create-question__form-col']}>
                  <button
                    type="button"
                    className={styles['create-question__button-new-param']}
                    onClick={this.addDynamicFields}
                  >
                    {t('buttons:addParameter')}
                  </button>
                </div>
              </div>
              <div className={styles['create-question__form-row']}>
                <div className={styles['create-question__form-col']}>
                  <Button
                    theme="gray-bordered"
                    onClick={() => {
                      onToggle(0);
                    }}
                  >
                    {t('buttons:back')}
                  </Button>
                </div>
                <div className={styles['create-question__form-col']}>
                  <Button type="submit">{t('buttons:create')}</Button>
                </div>
              </div>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default CreateNewQuestionForm;
