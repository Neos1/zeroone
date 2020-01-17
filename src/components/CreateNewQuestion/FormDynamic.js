import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer, inject } from 'mobx-react';
import uniqKey from 'react-id-generator';
import Input from '../Input';
import { TokenName, CloseIcon } from '../Icons';
import Button from '../Button/Button';

import styles from './CreateNewQuestion.scss';
import SimpleDropdown from '../SimpleDropdown';

@withTranslation()
@inject('projectStore')
@observer
class FormDynamic extends React.Component {
  static propTypes = {
    formDynamic: PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
      $: PropTypes.func.isRequired,
      map: PropTypes.func.isRequired,
      add: PropTypes.func.isRequired,
      del: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        isVotingActive: PropTypes.bool.isRequired,
      }),
    }).isRequired,
  };

  /**
   * Method for adding new fields (input & select)
   * to dynamic form
   */
  addDynamicFields = () => {
    const { props } = this;
    const { t, formDynamic } = props;
    const key = uniqKey();
    // Add input field
    formDynamic.add({
      // this format important!!!
      // @see getFieldKey
      // @see removeRowFields
      name: `input--${key}`,
      type: 'text',
      label: 'parameter',
      placeholder: t('fields:enterNewParameterName'),
      rules: 'required',
    });
    // Add select field
    formDynamic.add({
      // this format important!!!
      // @see getFieldKey
      // @see removeRowFields
      name: `select--${key}`,
      type: 'text',
      label: 'parameter',
      placeholder: t('fields:selectParameterType'),
      rules: 'required',
    });
  }

  /**
   * Method for getting uniq key for
   * similar fields (input & select)
   *
   * @param {string} name name field
   * @returns {string} uniq key for
   * select & input
   */
  getFieldKey = (name) => {
    if (!name || !name.split) return '';
    return name.split('--')[1] || '';
  }

  /**
   * Method for removing fields
   * with similar uniq key (input & select)
   *
   * @param {string} name name field
   */
  removeRowFields = (name) => {
    const key = this.getFieldKey(name);
    const { props } = this;
    const { formDynamic } = props;
    formDynamic.del(`input--${key}`);
    formDynamic.del(`select--${key}`);
  }

  render() {
    const { props } = this;
    const {
      formDynamic, t, onToggle, projectStore: { historyStore },
    } = props;
    const options = [{
      label: 'uint',
      value: 'uint',
    }, {
      label: 'String',
      value: 'string',
    }, {
      label: 'Address',
      value: 'address',
    }, {
      label: 'bytes4',
      value: 'bytes4',
    }, {
      label: 'bytes32',
      value: 'bytes32',
    }];
    return (
      <form
        form={formDynamic}
        onSubmit={formDynamic.onSubmit}
        className={styles['create-question__form--dynamic']}
      >
        {/* Render dynamic fields start */}
        {
          formDynamic.map((field, index) => {
            const key = this.getFieldKey(field.name);
            // Since two fields are added at a time,
            // duplicates need to be excluded
            // @see addDynamicFields method
            if (Number.isInteger(index / 2) === false) return null;
            return (
              <div className={styles['create-question__form-row']} key={field.name}>
                <div className={styles['create-question__form-col']}>
                  <Input field={formDynamic.$(`input--${key}`)}>
                    <TokenName />
                  </Input>
                </div>
                <div className={styles['create-question__form-col']}>
                  <SimpleDropdown
                    options={options}
                    field={formDynamic.$(`select--${key}`)}
                    onSelect={() => {}}
                  >
                    <TokenName />
                  </SimpleDropdown>
                </div>
                <button
                  type="button"
                  onClick={
                    () => this.removeRowFields(field.name)
                  }
                  className={styles['create-question__field-remove']}
                >
                  <CloseIcon fill="#000" />
                </button>
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
            <Button type="submit" disabled={historyStore.isVotingActive}>{t('buttons:create')}</Button>
            <div className={styles['create-question__form-text']}>
              {t('other:voteLaunchDescription')}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default FormDynamic;
