import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Button from '../../Button/Button';
import ConfigForm from '../../../stores/FormsStore/ConfigForm';
import Input from '../../Input';


import styles from '../Settings.scss';
import Dialog from '../../Dialog/Dialog';

@withTranslation()
@inject('configStore', 'dialogStore')
@observer
class SettingsBlock extends Component {
  settingsForm = new ConfigForm({
    hooks: {
      onSuccess: (form) => {
        // eslint-disable-next-line no-unused-vars
        const { configStore, dialogStore } = this.props;
        configStore.updateValues(form.values());
        dialogStore.show('apply_notification');
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    configStore: PropTypes.shape().isRequired,
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
    };
  }

  handleInputChange = () => {
    const { settingsForm, props } = this;
    const { configStore: { config } } = props;
    const formValues = settingsForm.values();
    const formKeys = Object.keys(settingsForm.values());
    let changed = [];
    formKeys.forEach((key) => {
      if (Number(formValues[key]) !== config[key]) {
        changed.push(key);
      } else {
        changed = changed.filter((e) => e !== key);
      }
    });
    if (changed.length !== 0) {
      this.setState({ isChanged: true });
    } else {
      this.setState({ isChanged: false });
    }
  }

  reloadApp = () => {
    window.location.reload();
  }

  render() {
    const { props, settingsForm, state: { isChanged } } = this;
    const { t, dialogStore, configStore: { config } } = props;
    return (
      <div className={`${styles.settings__block} ${styles['settings__block--settings']}`}>
        <h2 className={styles['settings__block-heading']}>{t('headings:other')}</h2>
        <div className={styles['settings__block-content']}>
          <form form={settingsForm} onSubmit={settingsForm.onSubmit}>
            <div className={styles['settings__block-group']}>
              <Input
                field={settingsForm.$('minGasPrice')}
                defaultValue={config.minGasPrice}
                onInput={this.handleInputChange}
              />
              <Input
                field={settingsForm.$('maxGasPrice')}
                defaultValue={config.maxGasPrice}
                onInput={this.handleInputChange}
              />
            </div>
            <Input field={settingsForm.$('interval')} defaultValue={config.interval} />
            {
              isChanged
                ? <Button theme="black" size="block" type="submit">{t('buttons:apply')}</Button>
                : null
}
          </form>
        </div>
        <Dialog
          name="apply_notification"
          size="md"
          footer={null}
          header="Требуется перезапуск приложения для применения настроек"
          closeable={false}
        >
          <div className={styles['modal-buttons']}>
            <Button theme="white" size="310" type="button" onClick={() => { this.reloadApp(); }}>{t('buttons:saveAndReload')}</Button>
            <Button theme="white" size="310" type="button" onClick={() => { dialogStore.hide(); }}>{t('buttons:saveWithoutReload')}</Button>
            <p>
              {t('other:reloadNotificaion')}
            </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SettingsBlock;
