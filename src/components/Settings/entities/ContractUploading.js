import React from 'react';
import { withTranslation } from 'react-i18next';
import Button from '../../Button/Button';

import styles from '../Settings.scss';

const Contractuploading = withTranslation()(({ t }) => (
  <div className={styles.settings__block}>
    <h2 className={styles['settings__block-heading']}>{t('headings:creatingAndUpload')}</h2>
    <div className={styles['settings__block-content']}>
      <Button theme="white">ERC20</Button>
      <Button theme="white">Custom tokens</Button>
      <Button theme="white">Project</Button>
    </div>
  </div>
));

export default Contractuploading;
