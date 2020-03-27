import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Password, BackIcon } from '../Icons';
import Input from '../Input';
import Button from '../Button/Button';
import Explanation from '../Explanation';
import Indicator from '../Indicator';
import passwordValidation from '../../utils/PasswordValidation';

import styles from '../Login/Login.scss';

@withTranslation()
class PasswordForm extends Component {
  static propTypes = {
    state: propTypes.bool.isRequired,
    form: propTypes.shape({
      $: propTypes.func.isRequired,
      onSubmit: propTypes.func.isRequired,
      loading: propTypes.bool.isRequired,
    }).isRequired,
    t: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      validity: {},
    };
  }

  componentDidMount() {
    const { form } = this.props;
    if (form.$('password').value !== '') {
      const { value } = form.$('password');
      const validity = passwordValidation(value);
      this.setState({ validity });
    }
  }

  handleInput = (value) => {
    const validity = passwordValidation(value);
    this.setState({ validity });
  }

  render() {
    const { state, form, t } = this.props;
    const { validity } = this.state;
    return (
      <FormBlock>
        <Heading>
          {t('headings:passwordCreation.heading')}
          <span>
            {t('headings:passwordCreation.subheading.0')}
            <br />
            {t('headings:passwordCreation.subheading.1')}
          </span>
        </Heading>
        <form form={form} onSubmit={form.onSubmit}>
          <Input type="password" field={form.$('password')} onInput={this.handleInput}>
            <Password />
          </Input>
          <Input type="password" field={form.$('passwordConfirm')}>
            <Password />
          </Input>
          <div className={styles.form__submit}>
            <Button
              theme="black"
              size="310"
              type="submit"
              disabled={form.loading}
            >
              {t('buttons:continue')}
            </Button>
          </div>
          <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
            <Explanation>
              <p>
                { t('explanations:passwordCreating.0')}
                <br />
                { t('explanations:passwordCreating.1')}
              </p>
              <div>
                <ul>
                  <li>
                    <Indicator checked={validity.Num || false} />
                    { t('explanations:passwordRules.numeric')}
                  </li>
                  <li>
                    <Indicator checked={validity.High || false} />
                    { t('explanations:passwordRules.upperCase')}
                  </li>
                  <li>
                    <Indicator checked={validity.Char || false} />
                    { t('explanations:passwordRules.symbol')}
                  </li>
                  <li>
                    <Indicator checked={validity.Length || false} />
                    { t('explanations:passwordRules.length')}
                  </li>
                </ul>
              </div>
            </Explanation>
          </div>
        </form>
        <NavLink to={`${state ? '/restore' : '/'}`}>
          <Button
            theme="back"
            icon={<BackIcon />}
          >
            {t('buttons:back')}
          </Button>
        </NavLink>
      </FormBlock>
    );
  }
}

export default PasswordForm;
