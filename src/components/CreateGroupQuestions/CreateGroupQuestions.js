import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Hint from '../Hint';
import CreateGroupQuestionsForm from '../../stores/FormsStore/CreateGroupQuestionsForm';
import Input from '../Input';
import { TokenName } from '../Icons';
import Button from '../Button/Button';
// import InputTextarea from '../Input/InputTextarea';

import styles from './CreateGroupQuestions.scss';

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
        const questionId = 2;
        const { name } = form.values();
        const [question] = questionStore.getQuestionById(questionId);
        const { paramTypes, groupId } = question;
        const encodedParams = Web3Service.web3.eth.abi.encodeParameters(paramTypes, [name]);
        // const votingData = encodedParams.replace('0x', methodSelector);
        // TODO groupId fix
        projectStore.setVotingData(questionId, groupId, encodedParams);
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
          {/* <InputTextarea
            field={form.$('description')}
          /> */}
          <Button
            type="submit"
            disabled={historyStore.isVotingActive}
            hint={
              historyStore.isVotingActive
                ? (
                  <Trans
                    i18nKey="other:hintFunctionalityNotAvailable"
                  >
                    During active voting, this
                    <br />
                    functionality is not available.
                  </Trans>
                )
                : null
            }
          >
            {t('buttons:create')}
          </Button>
        </form>
        <div className={styles['create-group-questions__subtext']}>
          {t('other:voteLaunchAdminDescription')}
        </div>
      </div>
    );
  }
}

export default CreateGroupQuestions;
