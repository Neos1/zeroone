import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import { CreateToken, ChainIcon, BackIcon } from '../Icons';

import styles from '../Login/Login.scss';


const AddNewProject = withTranslation()(({ t }) => (
  <Container>
    <div className={`${styles.form}`}>
      <FormBlock className="form__block">
        <Heading>
          {t('headings:addingProject.heading')}
          <span>
            {t('headings:addingProject.subheading.0')}
            <br />
            {t('headings:addingProject.subheading.1')}
          </span>
        </Heading>
        <div className={styles['add-project']}>
          <NavLink to="/newProject">
            <IconButton className="btn--white">
              <CreateToken />
              {t('buttons:create')}
            </IconButton>
          </NavLink>
          <NavLink to="/addExisting">
            <IconButton className="btn--white">
              <ChainIcon />
              {t('buttons:connect')}
            </IconButton>
          </NavLink>
        </div>
      </FormBlock>
      <NavLink to="/projects">
        <IconButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          {t('buttons:back')}
        </IconButton>
      </NavLink>
    </div>
  </Container>
));

export default AddNewProject;
