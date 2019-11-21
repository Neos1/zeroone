import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { IconWhiteButton, BackButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import { CreateToken, ChainIcon, BackIcon } from '../Icons';

import styles from '../Login/Login.scss';

const AddNewProject = withTranslation()(({ t }) => (
  <Container>
    <div className={styles.form}>
      <FormBlock className={styles.form__block}>
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
            <IconWhiteButton>
              <CreateToken />
              {t('buttons:create')}
            </IconWhiteButton>
          </NavLink>
          <NavLink to="/addExisting">
            <IconWhiteButton>
              <ChainIcon />
              {t('buttons:connect')}
            </IconWhiteButton>
          </NavLink>
        </div>
      </FormBlock>
      <NavLink to="/projects">
        <BackButton>
          <BackIcon />
          {t('buttons:back')}
        </BackButton>
      </NavLink>
    </div>
  </Container>
));

export default AddNewProject;
