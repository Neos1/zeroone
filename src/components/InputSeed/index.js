/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import Heading from '../Heading';
import Input from '../Input';
import SeedForm from '../../stores/FormsStore/SeedForm';

import styles from '../Login/Login.scss';
import FormBlock from '../FormBlock';
import { Button, IconButton } from '../Button';
import { BackIcon } from '../Icons';
import Loader from '../Loader';


@inject('appStore', 'userStore')
@observer

class InputSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      redirect: false,
    };
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  }

  toggleLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  }

  render() {
    const { userStore, recover } = this.props;
    const { _mnemonic: seed } = userStore;
    const { loading, redirect } = this.state;
    const { setRedirect, toggleLoading } = this;
    const seedForm = new SeedForm({
      hooks: {
        onSuccess(form) {
          const values = Object.values(form.values());
          const mnemonic = values.join(' ');
          toggleLoading();
          if (recover) {
            userStore.recoverWallet(mnemonic)
              .then((data) => {
                setRedirect();
              });
          } else if (!recover) {
            if (userStore.isSeedValid(mnemonic)) {
              userStore.saveWalletToFile();
              setRedirect();
            }
          }
        },
        onError(form) {
          console.log(`ALARM ${form}`);
        },
      },
    });

    if (redirect) return recover ? <Redirect to="/recoverPassword" /> : <Redirect to="/creatingSuccess" />;
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Проверка резервной фразы'}
              {loading ? 'Проверяется фраза' : 'Введите  фразу, которую вы записали'}
            </Heading>
            {loading ? <Loader /> : <InputBlock form={seedForm} seed={seed} />}
          </FormBlock>
          <NavLink to={`${recover ? '/' : '/showSeed'}`}>
            <IconButton className="btn--link btn--noborder btn--back">
              <BackIcon />
              Назад
            </IconButton>
          </NavLink>
        </div>
      </Container>
    );
  }
}

const InputBlock = ({ form, seed }) => (

  <form form={form} onSubmit={form.onSubmit}>
    <div className={styles.seed}>
      {seed.map((word, index) => (
        <Input type="text" field={form.$(`word_${index + 1}`)} placeholder="">
          <span>{index + 1}</span>
        </Input>
      ))}
    </div>
    <div className={styles.form__submit}>
      <Button className="btn--default btn--black" type="submit"> Продолжить </Button>
    </div>
  </form>

);

InputSeed.propTypes = {
  userStore: propTypes.object.isRequired,
  recover: propTypes.bool.isRequired,
};

InputBlock.propTypes = {
  form: propTypes.object.isRequired,
  seed: propTypes.arrayOf(propTypes.string).isRequired,
};

export default InputSeed;
