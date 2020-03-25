import React from 'react';
import { withTranslation } from 'react-i18next';
import ProgressBlock from '../ProjectUploading/ProgressBlock';
import {
  SendingIcon, TxHashIcon, TxRecieptIcon, CompilingIcon,
} from '../Icons';

import styles from './progress.scss';

const DeployingProgress = withTranslation()(({ step, t }) => {
  const stages = [
    [t('other:compiling'), <CompilingIcon />],
    [t('other:sending'), <SendingIcon />],
    [t('other:txHash'), <TxHashIcon />],
    [t('other:txReceipt'), <TxRecieptIcon />],
  ];

  return (
    <div className={styles['transaction-progress']}>
      {
        stages.map((stage, index) => (
          <ProgressBlock
            text={stage[0]}
            index={index}
            state={step}
            noline={index === 0}
            key={`stage-${index + 1}`}
          >
            {stage[1]}
          </ProgressBlock>
        ))
      }
    </div>
  );
});

export default DeployingProgress;
