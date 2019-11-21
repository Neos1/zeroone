import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { IconTopWhiteButton, BackButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import { Ethereum, CreateToken, BackIcon } from '../Icons';

import styles from '../Login/Login.scss';

@withTranslation()
@observer
class CreateNewProject extends Component {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <div className={`${styles.form} ${styles['form--wide']}`}>
          <FormBlock className={styles['form__block--wide']}>
            <Heading>
              {t('headings:newProject.heading')}
              {t('headings:newProject.subheading')}
            </Heading>
            <div className={styles.create}>
              <NavLink to="/createWithTokens">
                <strong className={styles.create__label}>{t('other:withTokens')}</strong>
                <IconTopWhiteButton>
                  <Ethereum />
                  {t('buttons:withTokens')}
                </IconTopWhiteButton>
              </NavLink>
              <NavLink to="/createWithoutTokens">
                <strong className={styles.create__label}>{t('other:withoutTokens')}</strong>
                <IconTopWhiteButton>
                  <CreateToken />
                  {t('buttons:withoutTokens')}
                </IconTopWhiteButton>
              </NavLink>
            </div>
          </FormBlock>
          <NavLink to="/createProject">
            <BackButton>
              <BackIcon />
              {t('buttons:back')}
            </BackButton>
          </NavLink>
        </div>
      </Container>
    );
  }
}

CreateNewProject.propTypes = {
  t: propTypes.func.isRequired,
};


export default CreateNewProject;
