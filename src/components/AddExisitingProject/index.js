/* eslint-disable no-console */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { Button, IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Loader from '../Loader';
import Explanation from '../Explanation';
import ConnectProjectForm from '../../stores/FormsStore/ConnectProject';


import styles from '../Login/Login.scss';
import Input from '../Input';
import {
  Address, TokenName, Login, BackIcon,
} from '../Icons';

@withTranslation()
@inject('appStore')
@observer
class AddExistingProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'default',
    };
  }

  connectProject = (form) => {
    const { appStore, t } = this.props;
    const { name, address } = form.values();
    this.setState({
      step: 'loading',
    });
    appStore.checkProject(address)
      .then(() => {
        this.setState({ step: 'success' });
        appStore.addProjectToList({ name, address });
      })
      .catch(() => {
        appStore.displayAlert(t('errors:tryAgain'), 3000);
        this.state = {
          step: 'default',
        };
      });
  }

  render() {
    const { appStore, t } = this.props;
    const { step } = this.state;
    const { connectProject } = this;

    const connectForm = new ConnectProjectForm({
      hooks: {
        onSuccess(form) {
          connectProject(form);
        },
        onError() {
          appStore.displayAlert(t('errors:validationError'), 3000);
        },
      },
    });

    return (
      <Container>
        <div className={`${styles.form}`}>
          {step === 'default' ? <InputBlock form={connectForm} /> : ''}
          {step === 'loading' ? <LoadingBlock /> : ''}
          {step === 'success' ? <MessageBlock /> : ''}
        </div>
      </Container>

    );
  }
}
const InputBlock = withTranslation()(({ t, form }) => (
  <FormBlock className="form__block">
    <Heading>
      {t('headings:сonnectProject.heading')}
      {t('headings:сonnectProject.subheading')}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <Input field={form.$('address')}>
        <Address />
      </Input>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black btn--310" type="submit">
          {t('buttons:continue')}
        </Button>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            {t('explanations:project.name')}
          </p>
        </Explanation>
        <Explanation>
          <p>
            {t('explanations:project.address')}
          </p>
        </Explanation>
      </div>
    </form>
    <NavLink to="/createProject">
      <IconButton className="btn--text btn--link btn--noborder btn--back" type="submit">
        <BackIcon />
        {t('buttons:back')}
      </IconButton>
    </NavLink>
  </FormBlock>
));

const LoadingBlock = withTranslation()(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:projectChecking.heading')}
      {t('headings:projectChecking.subheading')}
    </Heading>
    <Loader />
  </FormBlock>
));

const MessageBlock = withTranslation()(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:projectConnected.heading')}
      {t('headings:projectConnected.subheading')}
    </Heading>
    <IconButton className="btn--default btn--black btn--240" type="submit">
      {<Login />}
      {t('buttons:toConnectedProject')}
    </IconButton>
    <NavLink to="/projects">
      <Button className="btn--text btn--link btn--noborder" type="submit">{t('buttons:otherProject')}</Button>
    </NavLink>
  </FormBlock>
));
AddExistingProject.propTypes = {
  appStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};
InputBlock.propTypes = {
  form: propTypes.object.isRequired,
};
export default AddExistingProject;
