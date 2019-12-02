import React from 'react';
import { withTranslation } from 'react-i18next';
import Indicator from '../Indicator';

import styles from '../Login/Login.scss';

const StepIndicator = withTranslation()(({ t, currentStep, stepCount }) => {
  const arr = new Array(stepCount).fill('');
  return (
    <div className={styles['step-indicator']}>
      <p>
        {t('other:step')}
        <span>
          {` ${currentStep} `}
        </span>
        {t('other:from')}
        <span>
          {` ${stepCount} `}
        </span>
      </p>
      <p>
        {arr.map((item, index) => <Indicator checked={currentStep >= index + 1} />)}
      </p>
    </div>
  );
});

export default StepIndicator;
