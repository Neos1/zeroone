import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Hint from '../Hint';
import CreateGroupQuestionsForm from '../../stores/FormsStore/CreateGroupQuestionsForm';

import styles from './CreateGroupQuestions.scss';
import Input from '../Input';
import { TokenName } from '../Icons';
import InputTextarea from '../Input/InputTextarea';
import Button from '../Button/Button';

@withTranslation()
@inject('dialogStore')
@observer
class CreateGroupQuestions extends React.PureComponent {
  form = new CreateGroupQuestionsForm({
    hooks: {
      onSuccess: () => {
        const { dialogStore } = this.props;
        dialogStore.toggle('password_form');
        return Promise.resolve();
      },
      onError: () => {
        /* eslint-disable-next-line */
        console.error('error');
      },
    },
  });

  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({
      toggle: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { props, form } = this;
    const { t } = props;
    return (
      <div
        className={styles['create-group-questions']}
      >
        <h2
          className={styles['create-group-questions__title']}
        >
          {t('dialogs:createAGroupOfQuestions')}
          <Hint>
            {t('other:createGroupQuestionsDescription')}
          </Hint>
        </h2>
        <div className={styles['create-group-questions__subtitle']}>
          {t('other:createNameForTheGroupQuestions')}
        </div>
        <form
          form={form}
          onSubmit={form.onSubmit}
        >
          <Input field={form.$('name_group')}>
            <TokenName />
          </Input>
          <InputTextarea
            field={form.$('description')}
          />
          <Button type="submit">{t('buttons:create')}</Button>
        </form>
        <div className={styles['create-group-questions__subtext']}>
          {t('other:voteLaunchAdminDescription')}
        </div>
      </div>
    );
  }
}

export default CreateGroupQuestions;
