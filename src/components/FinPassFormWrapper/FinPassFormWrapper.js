import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Input from '../Input';
import { Password } from '../Icons';
import Button from '../Button/Button';

import styles from './FinPassFormWrapper.scss';

@withTranslation()
class FinPassFormWrapper extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
      $: PropTypes.func.isRequired,
    }).isRequired,
    buttonText: PropTypes.string.isRequired,
  };

  render() {
    const { props } = this;
    const { t, form, buttonText } = props;
    return (
      <div
        className={styles['form-fin-pass']}
      >
        <form
          form={form}
          onSubmit={form.onSubmit}
        >
          <div className={styles.input__wrapper}>
            <Input field={form.$('password')}>
              <Password />
            </Input>
          </div>
          <div className={styles.button__wrapper}>
            <Button
              className="btn--default btn--black"
              type="submit"
            >
              {buttonText || t('buttons:startNewVoting')}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default FinPassFormWrapper;
