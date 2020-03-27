import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Input from '../Input';
import {
  TokenName, Password, Address,
} from '../Icons';
import Button from '../Button/Button';

import styles from '../Decision/Decision.scss';

@withTranslation()
@observer
class ProjectInputForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;
    const {
      t, form,
    } = props;
    return (
      <div className={styles.decision}>
        <form form={form} className={styles['decision__token-form']} onSubmit={form.onSubmit}>
          <Input field={form.$('name')}>
            <TokenName />
          </Input>
          <Input field={form.$('address')}>
            <Address />
          </Input>
          <Input field={form.$('password')}>
            <Password />
          </Input>
          <div className={styles.form__submit}>
            <Button
              theme="black"
              size="310"
              type="submit"
              disabled={form.loading}
            >
              {t('buttons:create')}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectInputForm;
