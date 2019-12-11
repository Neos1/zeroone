import React from 'react';
import { withTranslation } from 'react-i18next';
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

const NodeConnection = withTranslation()(({ t }) => (
  <div className={styles.settings__block}>
    <h2 className={styles['settings__block-heading']}>{t('headings:nodeConnection')}</h2>
    <div className={styles['settings__block-content']}>
      <Input field={createProject.$('name')}>
        <Address />
      </Input>
      <Button theme="black" size="block">{t('buttons:continue')}</Button>
    </div>
  </div>
));

export default NodeConnection;
