import React from 'react';
import Button from '../../Button/Button';

import styles from '../Settings.scss';

const Contractuploading = () => (
  <div className={styles.settings__block}>
    <h2 className={styles['settings__block-heading']}>Создание или загрузка контрактов</h2>
    <div className={styles['settings__block-content']}>
      <Button theme="white">ERC20</Button>
      <Button theme="white">Custom tokens</Button>
      <Button theme="white">Project</Button>
    </div>
  </div>
);

export default Contractuploading;
