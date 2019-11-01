import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import { AddIcon } from '../Icons';

import styles from '../Login/Login.scss';


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
    const { appStore: { projectList } } = this.props;
    const projects = projectList.map((project) => (
      <Button className="btn--big btn--white">
        {' '}
        {project.name}
        {' '}
      </Button>
    ));
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={`${styles.form} ${styles['form--wide']}`}>
          <FormBlock className="form__block--wide">
            <Heading>
              {'Выбор проекта'}
              {'Выберите проект или создайте новый'}
            </Heading>
            <div className={styles.projects}>
              {' '}
              {projects}
              <NavLink to="/createProject">
                <IconButton className="btn--big btn--white btn--dashed">
                  <AddIcon />
                  Добавить проект
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
};

export default ProjectList;
