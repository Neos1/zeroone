import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Button from '../Button/Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Explanation from '../Explanation';
import ConnectProjectForm from '../../stores/FormsStore/ConnectProject';
import Input from '../Input';
import {
  Address, TokenName, Login, BackIcon,
} from '../Icons';
import LoadingBlock from '../LoadingBlock';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('appStore')
@observer
class AddExistingProject extends Component {
  connectForm = new ConnectProjectForm({
    hooks: {
      onSuccess: (form) => this.connectProject(form),
      onError: () => {
        this.showError();
      },
    },
  });

  steps = {
    default: 0,
    loading: 1,
    success: 2,
    redirect: 3,
  }

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    appStore: propTypes.shape({
      checkProject: propTypes.func.isRequired,
      addProjectToList: propTypes.func.isRequired,
      displayAlert: propTypes.func.isRequired,
      checkIsQuestionsUploaded: propTypes.func.isRequired,
      gotoProject: propTypes.func.isRequired,
      setProjectAddress: propTypes.func.isRequired,
    }).isRequired,
    t: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: this.steps.default,
      projectName: '',
      projectAddress: '',
    };
  }

  connectProject = (form) => {
    const { steps } = this;
    const { appStore, t } = this.props;
    const { name, address: rawAddress } = form.values();
    const address = rawAddress.trim();
    this.setState({
      currentStep: steps.loading,
    });
    return new Promise((resolve, reject) => {
      appStore.checkProject(address)
        .then(() => {
          this.setState({
            currentStep: steps.success,
            projectAddress: address,
            projectName: name,
          });
          appStore.addProjectToList({ name, address });
          return resolve();
        })
        .catch(() => {
          appStore.displayAlert(t('errors:tryAgain'), 3000);
          this.setState({
            currentStep: steps.default,
          });
          return reject();
        });
    });
  }

  showError = () => {
    const { appStore, t } = this.props;
    appStore.displayAlert(t('errors:validationError'), 3000);
  }

  startUploading = (address) => {
    const { appStore } = this.props;
    appStore.setProjectAddress(address);
    this.setState({ currentStep: this.steps.redirect });
  }

  checkProject = async ({
    address,
    name,
  }) => {
    const { appStore } = this.props;
    const isQuestionsUploaded = await appStore.checkIsQuestionsUploaded(address);
    // eslint-disable-next-line no-unused-expressions
    isQuestionsUploaded
      ? appStore.gotoProject({ address, name })
      : this.startUploading(address);
  }

  renderSwitch(step) {
    const { steps } = this;
    const { projectAddress, projectName } = this.state;
    const { t } = this.props;
    switch (step) {
      case steps.default:
        return <InputBlock form={this.connectForm} />;
      case steps.loading:
        return (
          <LoadingBlock>
            <Heading>
              {t('headings:projectChecking.heading')}
              {t('headings:projectChecking.subheading')}
            </Heading>
          </LoadingBlock>
        );
      case steps.success:
        return (
          <MessageBlock
            address={projectAddress}
            name={projectName}
            onClick={this.checkProject}
          />
        );
      case steps.redirect:
        return <Redirect to="/uploadQuestions" />;
      default:
        return '';
    }
  }

  render() {
    const { currentStep } = this.state;
    return (
      <Container>
        <div className={`${styles.form}`}>
          {this.renderSwitch(currentStep)}
        </div>
      </Container>
    );
  }
}

const InputBlock = withTranslation()(({ t, form }) => (
  <FormBlock className={styles.form__block}>
    <Heading>
      {t('headings:connectProject.heading')}
      {t('headings:connectProject.subheading')}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <Input field={form.$('address')}>
        <Address />
      </Input>
      <div className={styles.form__submit}>
        <Button theme="black" size="310" type="submit" disabled={form.disabled}>
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
      <Button theme="back" icon={<BackIcon />}>
        {t('buttons:back')}
      </Button>
    </NavLink>
  </FormBlock>
));

const MessageBlock = withTranslation()(observer(({
  t, onClick, address, name,
}) => (
  <FormBlock>
    <Heading>
      {t('headings:projectConnected.heading')}
      {t('headings:projectConnected.subheading')}
    </Heading>
    <Button theme="black" size="240" icon={<Login />} onClick={() => { onClick({ address, name }); }}>
      {t('buttons:toConnectedProject')}
    </Button>
    <NavLink to="/projects">
      <Button theme="link">
        {t('buttons:otherProject')}
      </Button>
    </NavLink>
  </FormBlock>
)));

InputBlock.propTypes = {
  form: propTypes.shape({
    onSubmit: propTypes.func.isRequired,
    $: propTypes.func.isRequired,
  }).isRequired,
};

export default AddExistingProject;
