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
@inject('dialogStore', 'projectStore')
@observer
class CreateGroupQuestions extends React.PureComponent {
  form = new CreateGroupQuestionsForm({
    hooks: {
      onSuccess: (form) => {
        const {
          projectStore: {
            rootStore: {
              Web3Service,
            },
            questionStore,
          },
          projectStore,
          dialogStore,
        } = this.props;
        const questionId = 3;
        console.log(form.values());
        const { name } = form.values();
        const [question] = questionStore.getQuestionById(questionId);
        const { params: parameters, groupId, methodSelector } = question;
        const params = parameters.map((param) => (param[1]));
        const encodedParams = Web3Service.web3.eth.abi.encodeParameters(params, [name]);
        const votingData = encodedParams.replace('0x', methodSelector);
        projectStore.setVotingData(questionId, groupId, votingData);
        dialogStore.toggle('password_form_questions');
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
    projectStore: PropTypes.shape().isRequired,
  };

  render() {
    const { props, form } = this;
    const { t, projectStore: { historyStore } } = props;
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
          <Input field={form.$('name')}>
            <TokenName />
          </Input>
          <InputTextarea
            field={form.$('description')}
          />
          <Button type="submit" disabled={historyStore.isVotingActive}>{t('buttons:create')}</Button>
        </form>
        <div className={styles['create-group-questions__subtext']}>
          {t('other:voteLaunchAdminDescription')}
        </div>
      </div>
    );
  }
}

export default CreateGroupQuestions;
