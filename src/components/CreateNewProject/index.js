import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import { Ethereum, CreateToken, BackIcon } from '../Icons';

import styles from '../Login/Login.scss';

@observer
class CreateNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
                <IconButton className="btn--big btn--white icon--top">
                  <Ethereum />
                  {t('buttons:withTokens')}
                </IconButton>
              </NavLink>
              <NavLink to="/createWithoutTokens">
                <strong className={styles.create__label}>{t('other:withoutTokens')}</strong>
                <IconButton className="btn--big btn--white icon--top">
                  <CreateToken />
                  {t('buttons:withoutTokens')}
                </IconButton>
              </NavLink>
            </div>
          </FormBlock>
          <NavLink to="/createProject">
            <IconButton className="btn--link btn--noborder btn--back">
              <BackIcon />
              {t('buttons:back')}
            </IconButton>
          </NavLink>
        </div>
      </Container>
    );
  }
}

CreateNewProject.propTypes = {
  t: propTypes.func.isRequired,
};


export default withTranslation()(CreateNewProject);
