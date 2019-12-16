/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { EMPTY_DATA_STRING } from '../../constants';
import DefaultMessage from './DefaultMessage';
import Loader from '../Loader';

import styles from './Message.scss';

/**
 * Dialog with message about success token transfer
 */
@withTranslation(['dialogs', 'other'])
class TransactionProgress extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    value: EMPTY_DATA_STRING,
  }

  render() {
    const {
      props: {
        t,
        value,
      },
    } = this;
    return (
      <div className={styles['message--transfer-progress']}>
        <Loader />
      </div>
    );
  }
}

export default TransactionProgress;
