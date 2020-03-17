/* eslint-disable react/static-property-placement */
import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import { observable } from 'mobx';
import nextId from 'react-id-generator';
import SimpleDropdown from '../SimpleDropdown';
import { Address, QuestionIcon } from '../Icons';
import Input from '../Input';
import Button from '../Button/Button';
import StarNewVoteForm from '../../stores/FormsStore/StartNewVoteForm';
import { systemQuestionsId } from '../../constants';

import styles from './StartNewVote.scss';

@withRouter
@withTranslation()
@inject('projectStore', 'dialogStore')
@observer
class StartNewVote extends React.Component {
  @observable initIndex = null;

  votingData = '';

  form = new StarNewVoteForm({
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
        const data = form.values();
        const keys = Object.keys(data);
        keys.forEach((key) => {
          const text = String(data[key]);
          data[key] = text.trim();
        });
        const { question: questionId } = data;
        delete data.question;
        const values = Object.values(data);
        const [question] = questionStore.getQuestionById(questionId);
        const { paramTypes, groupId, methodSelector } = question;
        const encodedParams = Web3Service.web3.eth.abi.encodeParameters(paramTypes, values);
        const votingData = encodedParams.replace('0x', methodSelector);
        projectStore.setVotingData(questionId, groupId, votingData);
        dialogStore.toggle('password_form');
        return Promise.resolve();
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  });

  static propTypes = {
    t: PropTypes.func.isRequired,
    projectStore: PropTypes.shape().isRequired,
    dialogStore: PropTypes.shape().isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelected: false,
      description: '',
    };
  }

  componentDidMount() {
    const { props, form } = this;
    const { projectStore: { rootStore: { eventEmitterService } } } = props;
    eventEmitterService.subscribe('new_vote:toggle', (selected) => {
      this.initIndex = Number(selected.value);
      form.$('question').set(selected.value);
      this.handleSelect(selected);
    });
    eventEmitterService.subscribe('new_vote:closed', () => {
      this.initIndex = null;
      this.setState({ isSelected: false });
    });
  }

  // eslint-disable-next-line consistent-return
  handleSelect = (selected) => {
    const { form } = this;
    const { projectStore, dialogStore, history } = this.props;
    const { questionStore } = projectStore;
    const [question] = questionStore.getQuestionById(selected.value);
    const { paramTypes, paramNames, text: description } = question;
    this.initIndex = Number(selected.value);
    this.setState({ description });
    // @ Clearing fields, except question selection dropdown
    // eslint-disable-next-line array-callback-return
    form.map((field) => {
      if (field.name === 'question') return;
      form.del(field.name);
    });
    // @ If Question have dedicated modal, then toggle them, else create fields
    switch (selected.value) {
      case systemQuestionsId.addingNewQuestion:
        history.push('/questions');
        dialogStore.toggle('create_question');
        break;
      case systemQuestionsId.connectGroupQuestions:
        history.push('/questions');
        dialogStore.toggle('create_group_question');
        break;
      default:
        this.createFields(paramTypes, paramNames);
    }
    this.setState({ isSelected: true });
  }

  // eslint-disable-next-line class-methods-use-this
  createFields(paramTypes, paramNames) {
    if (
      paramTypes
      && paramNames
      && paramTypes.length
      && paramNames.length
      && paramTypes.length === paramNames.length
    ) {
      paramNames.forEach((name, index) => {
        this.form.add({
          name,
          type: 'text',
          label: 'parameter',
          placeholder: name,
          rules: `required|${paramTypes[index]}`,
        });
      });
    }
  }

  render() {
    const { form, initIndex } = this;
    const { isSelected, description } = this.state;
    const { props } = this;
    const { t, projectStore } = props;
    const {
      historyStore,
      questionStore: { newVotingOptions },
      questionStore: { rootStore: { membersStore: { nonERC } } },
    } = projectStore;
    return (
      <div
        className={styles['new-vote']}
      >
        <div
          className={styles['new-vote__top']}
        >
          <h2
            className={styles['new-vote__title']}
          >
            {t('other:startANewVote')}
          </h2>
          <div
            className={styles['new-vote__dropdown']}
          >
            <SimpleDropdown
              options={newVotingOptions}
              field={form.$('question')}
              onSelect={this.handleSelect}
              initIndex={initIndex}
              key={nextId('question_dropdown')}
            >
              <QuestionIcon />
            </SimpleDropdown>
            {
              isSelected
                ? (
                  <div className={styles['new-vote__description']}>
                    {/* TODO add correct description text */}
                    {
                      description
                      && description.length
                      && description.length > 150
                        ? description.substr(0, 130)
                        : description
                      }
                  </div>
                )
                : null
            }
          </div>
        </div>
        <div
          className={styles['new-vote__content']}
        >
          {
            isSelected
              ? (
                <form
                  className={styles['new-vote__form']}
                  onSubmit={form.onSubmit}
                >
                  <div className={styles['new-vote__form-row']}>
                    {form.map((field) => {
                      if (field.name === 'question') return null;
                      return (field.placeholder === 'Group' || field.placeholder === 'Group address')
                        ? (
                          <div
                            className={styles['new-vote__form-col']}
                            key={nextId('new_vote__form_col')}
                          >
                            <SimpleDropdown
                              options={nonERC}
                              field={field}
                              initIndex={null}
                            >
                              <Address />
                            </SimpleDropdown>
                          </div>
                        )
                        : (
                          <div
                            className={styles['new-vote__form-col']}
                            key={nextId('new_vote__form_col')}
                          >
                            <Input field={field}><Address /></Input>
                          </div>
                        );
                    })}
                  </div>
                  <div className={styles['new-vote__form-row']}>
                    <div className={styles['new-vote__form-col']} />
                    <div className={styles['new-vote__form-col']}>
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
                        {t('buttons:start')}
                      </Button>
                    </div>
                  </div>
                </form>
              )
              : (
                <div className={styles['new-vote__content--empty']}>
                  <p className={styles['new-vote__content--empty-text']}>
                    {t('other:newVoteEmptyStateText')}
                  </p>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default StartNewVote;
