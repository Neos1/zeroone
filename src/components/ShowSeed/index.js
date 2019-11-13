/* eslint-disable class-methods-use-this */
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
import { IconButton, Button } from '../Button';
import { BackIcon, EyeIcon, CrossedEyeIcon } from '../Icons';

import styles from '../Login/Login.scss';

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
              {userStore._mnemonic.map((word, id) => (
                <SeedWord {...{ word, id, visible }} />
              ))}
            </div>
            <div className={styles.form__submit}>
              <NavLink to="/checkSeed">
                <Button className="btn--default btn--black"> Продолжить </Button>
              </NavLink>
            </div>
          </FormBlock>
          <NavLink to="/">
            <IconButton className="btn--link btn--noborder btn--back">
              <BackIcon />
              Назад
            </IconButton>
          </NavLink>
          <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
            <Explanation>
              <p> Фраза дает полный контроль над вашей учетной записью </p>
              <p> Обязательно запишите и не сообщайте ее никому </p>
            </Explanation>
            <IconButton onClick={this.toggleWords} className="btn--white btn--show-seed">
              {!visible ? <EyeIcon /> : <CrossedEyeIcon />}
              {!visible ? 'Показать фразу' : 'Скрыть фразу'}
            </IconButton>
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
  userStore: propTypes.object.isRequired,
  appStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};
SeedWord.propTypes = {
  id: propTypes.number.isRequired,
  word: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
};

export default withTranslation()(ShowSeed);
