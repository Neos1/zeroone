import React from 'react';
import Container from '../Container';
import Footer from '../Footer';
import Button from '../Button/Button';
import CreateProjectForm from '../../stores/FormsStore/CreateProject';
import { Address } from '../Icons';

import styles from './Settings.scss';
import Input from '../Input';
import LangSwitcher from '../LangSwitcher';

const createProject = new CreateProjectForm({
  hooks: {
    onSuccess: (form) => this.gotoUploading(form),
    onError: () => this.showValidationError(),
  },
});


const Settings = () => (
  <Container>
    <div className={styles.settings}>
      <div className={styles.settings__block}>
        <h2 className={styles['settings__block-heading']}>Подключение ноды</h2>
        <div className={styles['settings__block-content']}>
          <Input field={createProject.$('name')}>
            <Address />
          </Input>
          <Button theme="black" size="block">Продолжить</Button>
        </div>
      </div>
      <div className={styles.settings__block}>
        <h2 className={styles['settings__block-heading']}>Создание или загрузка контрактов</h2>
        <div className={styles['settings__block-content']}>
          <Button theme="white">ERC20</Button>
          <Button theme="white">Custom tokens</Button>
          <Button theme="white">Project</Button>
        </div>
      </div>
      <div className={`${styles.settings__block} ${styles['settings__block--lang']}`}>
        <h2 className={styles['settings__block-heading']}>Язык интерфейса</h2>
        <div className={styles['settings__block-content']}>
          <LangSwitcher />
          <Button theme="white">Применить</Button>
        </div>
      </div>
    </div>
    <Footer />
  </Container>
);

export default Settings;
