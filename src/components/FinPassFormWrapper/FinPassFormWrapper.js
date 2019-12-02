/* eslint-disable react/static-property-placement */
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
  };

  render() {
    const { props } = this;
    const { t, form } = props;
    return (
      <div
        className={styles['form-fin-pass']}
      >
        <form
          onSubmit={form.onSubmit}
        >
          <div className={styles.input__wrapper}>
            <Input field={form.$('fin-password')}>
              <Password />
            </Input>
          </div>
          <div className={styles.button__wrapper}>
            <Button
              className="btn--default btn--black"
              type="submit"
            >
              {t('buttons:vote')}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default FinPassFormWrapper;
