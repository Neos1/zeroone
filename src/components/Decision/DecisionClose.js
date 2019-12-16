import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Decision from './Decision';

@withTranslation()
@inject('dialogStore')
@observer
class DecisionClose extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.shape().isRequired,
  };

  render() {
    const { props } = this;
    // eslint-disable-next-line no-unused-vars
    const { t, form } = props;
    return (
      <>
        <Decision
          title="Завершение голосования"
          icon={null}
          form={form}
        />
      </>
    );
  }
}

export default DecisionClose;
