import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Button from '../Button/Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import { AddIcon } from '../Icons';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('appStore')
@observer
class ProjectList extends Component {
  static propTypes = {
    appStore: propTypes.shape({
      readProjectList: propTypes.func.isRequired,
      projectList: propTypes.arrayOf(propTypes.object).isRequired,
      checkIsQuestionsUploaded: propTypes.func.isRequired,
      gotoProject: propTypes.func.isRequired,
      setProjectAddress: propTypes.func.isRequired,
    }).isRequired,
    t: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirectToProject: false,
      redirectToUploading: false,
    };
  }

  componentDidMount() {
    const { appStore } = this.props;
    appStore.readProjectList();
  }

  gotoProject = ({ address, name }) => {
    const { appStore } = this.props;
    appStore.gotoProject({ address, name });
    this.setState({ redirectToProject: true });
  }

  startUploading = (address) => {
    const { appStore } = this.props;
    appStore.setProjectAddress(address);
    this.setState({ redirectToUploading: true });
  }

  checkProject = async ({
    address,
    name,
  }) => {
    const { appStore } = this.props;
    const isQuestionsUploaded = await appStore.checkIsQuestionsUploaded(address);
    // eslint-disable-next-line no-unused-expressions
    isQuestionsUploaded
      ? this.gotoProject({ address, name })
      : this.startUploading(address);
  }

  render() {
    const { appStore: { projectList }, t } = this.props;
    const { redirectToProject, redirectToUploading } = this.state;
    const projects = projectList.map((project, index) => (
      <Button
        theme="project"
        key={`Button-${index + 1}`}
        onClick={() => {
          this.checkProject({
            address: project.address,
            name: project.name,
          });
        }}
      >
        {project.name.replace(/([!@#$%^&*()_+\-=])+/g, ' ')}
      </Button>
    ));

    if (redirectToProject) return <Redirect to="/questions" />;
    if (redirectToUploading) return <Redirect to="/uploadQuestions" />;
    return (
      <Container>
        <div className={`${styles.form} ${styles['form--wide']}`}>
          <FormBlock className={styles['form__block--wide']}>
            <Heading>
              {t('headings:projects.heading')}
              {t('headings:projects.subheading')}
            </Heading>
            <div className={styles.projects}>
              {projects}
              <NavLink to="/createProject">
                <Button theme="addproject" icon={<AddIcon />}>
                  {t('buttons:addProject')}
                </Button>
              </NavLink>
            </div>
          </FormBlock>
        </div>
      </Container>
    );
  }
}

export default ProjectList;
