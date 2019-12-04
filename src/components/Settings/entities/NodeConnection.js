import React from 'react';
import Input from '../../Input';
import { Address } from '../../Icons';
import CreateProjectForm from '../../../stores/FormsStore/CreateProject';
import Button from '../../Button/Button';


import styles from '../Settings.scss';

const createProject = new CreateProjectForm({
  hooks: {
    onSuccess: (form) => this.gotoUploading(form),
    onError: () => this.showValidationError(),
  },
});

const NodeConnection = () => (
  <div className={styles.settings__block}>
    <h2 className={styles['settings__block-heading']}>Подключение ноды</h2>
    <div className={styles['settings__block-content']}>
      <Input field={createProject.$('name')}>
        <Address />
      </Input>
      <Button theme="black" size="block">Продолжить</Button>
    </div>
  </div>
);

export default NodeConnection;
