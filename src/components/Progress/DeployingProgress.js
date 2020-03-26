import React from 'react';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import ProgressBlock from '../ProjectUploading/ProgressBlock';
import {
  SendingIcon, TxHashIcon, TxRecieptIcon, CompilingIcon, QuestionUploadingIcon,
} from '../Icons';

import styles from './progress.scss';

const DeployingProgress = withTranslation()(inject('appStore')(observer(({ appStore, type, t }) => {
  const stagesToken = [
    [t('other:compiling'), <CompilingIcon />],
    [t('other:sending'), <SendingIcon />],
    [t('other:txHash'), <TxHashIcon />],
    [t('other:txReceipt'), <TxRecieptIcon />],
  ];

  const stagesZeroOne = [
    [t('other:compiling'), <CompilingIcon />],
    [t('other:sending'), <SendingIcon />],
    [t('other:txHash'), <TxHashIcon />],
    [t('other:txReceipt'), <TxRecieptIcon />],
    [t('other:questionsUploading'), [
      <QuestionUploadingIcon />,
      <span>
        {appStore.uploadedQuestion}
        {'/'}
        {appStore.countOfQuestions}
      </span>],
    ],
  ];

  return (
    <div className={
      `${styles['transaction-progress']}
       ${type === 'ZeroOne'
        ? styles['transaction-progress--zeroone']
        : ''
        } 
      `
      }
    >
      {
        type === 'ZeroOne'
          ? stagesZeroOne.map((stage, index) => (
            <ProgressBlock
              text={stage[0]}
              index={index}
              state={appStore.transactionStep}
              noline={index === 0}
              key={`stage-${index + 1}`}
            >
              {stage[1]}
            </ProgressBlock>
          ))
          : stagesToken.map((stage, index) => (
            <ProgressBlock
              text={stage[0]}
              index={index}
              state={appStore.transactionStep}
              noline={index === 0}
              key={`stage-${index + 1}`}
            >
              {stage[1]}
            </ProgressBlock>
          ))
      }
    </div>
  );
})));

export default DeployingProgress;
