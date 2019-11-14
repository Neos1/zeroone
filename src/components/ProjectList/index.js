import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { Button, IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import { AddIcon } from '../Icons';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('appStore')
@observer
class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { appStore } = this.props;
    appStore.readProjectList();
  }

  render() {
    const { appStore: { projectList }, t } = this.props;
    const projects = projectList.map((project, index) => (
      <Button key={`${index + 1}`} className="btn--big btn--white">{project.name}</Button>
    ));
    return (
      <Container>
        <div className={`${styles.form} ${styles['form--wide']}`}>
          <FormBlock className="form__block--wide">
            <Heading>
              {t('headings:projects.heading')}
              {t('headings:projects.subheading')}
            </Heading>
            <div className={styles.projects}>
              {' '}
              {projects}
              <NavLink to="/createProject">
                <IconButton className="btn--big btn--white btn--dashed btn--add-project">
                  <AddIcon />
                  {t('buttons:addProject')}
                </IconButton>
              </NavLink>
            </div>
          </FormBlock>
        </div>
      </Container>
    );
  }
}

ProjectList.propTypes = {
  appStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};

export default withTranslation()(ProjectList);
