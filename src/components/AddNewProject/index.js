import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Button from '../Button/Button';
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
            <Button theme="white" icon={<CreateToken />}>
              {t('buttons:create')}
            </Button>
          </NavLink>
          <NavLink to="/addExisting">
            <Button theme="white" icon={<ChainIcon />}>
              {t('buttons:connect')}
            </Button>
          </NavLink>
        </div>
      </FormBlock>
      <NavLink to="/projects">
        <Button theme="back" icon={<BackIcon />}>
          {t('buttons:back')}
        </Button>
      </NavLink>
    </div>
  </Container>
));

export default AddNewProject;
