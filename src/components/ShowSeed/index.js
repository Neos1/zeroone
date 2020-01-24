/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Explanation from '../Explanation';
import Button from '../Button/Button';
import { BackIcon, EyeIcon, CrossedEyeIcon } from '../Icons';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class ShowSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleWords = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  redirectToInput() {
    return <Redirect to="/checkSeed" />;
  }

  render() {
    const { userStore, t } = this.props;
    const { visible } = this.state;
    return (
      <Container>
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {t('headings:showSeed.heading')}
              {t('headings:showSeed.subheading')}
            </Heading>
            <div className={styles.seed}>
              {userStore.mnemonic.map((word, id) => (
                <SeedWord key={`word-${id + 1}`} {...{ word, id, visible }} />
              ))}
            </div>
            <div className={styles.form__submit}>
              <NavLink to="/checkSeed">
                <Button theme="black" size="310">
                  {t('buttons:continue')}
                </Button>
              </NavLink>
            </div>
          </FormBlock>
          <NavLink to="/">
            <Button theme="back">
              <BackIcon />
              {t('buttons:back')}
            </Button>
          </NavLink>
          <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
            <Explanation
              bold
            >
              <p>{t('explanations:seed.0')}</p>
              <p>{t('explanations:seed.1')}</p>
            </Explanation>
            <Button
              theme="white"
              className="btn--showseed"
              icon={!visible ? <EyeIcon /> : <CrossedEyeIcon />}
              onClick={this.toggleWords}
            >
              {!visible ? t('buttons:showSeed') : t('buttons:hideSeed')}
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

const SeedWord = ({ word, id, visible }) => (
  <p className="seed__word">
    <span className="seed__word-id">{id + 1}</span>
    <span className="seed__word-text">{visible ? word : ('*').repeat(word.length)}</span>
  </p>
);

ShowSeed.propTypes = {
  userStore: propTypes.shape({
    mnemonic: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
};

SeedWord.propTypes = {
  id: propTypes.number.isRequired,
  word: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
};

export default ShowSeed;
