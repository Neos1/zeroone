/* eslint-disable react/static-property-placement */
import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import SimpleDropdown from '../SimpleDropdown';
import { Address, QuestionIcon } from '../Icons';
import Input from '../Input';
import Button from '../Button/Button';
import StarNewVoteForm from '../../stores/FormsStore/StartNewVoteForm';

import styles from './StartNewVote.scss';

@withTranslation()
@inject('projectStore', 'dialogStore')
@observer
class StartNewVote extends React.Component {
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
        } = this.props;
        const data = form.values();
        const { question: questionId } = data;
        delete data.question;
        const values = Object.values(data);
        const [question] = questionStore.getQuestionById(questionId);
        const { params: parameters, methodSelector } = question;
        const params = parameters.map((param) => (param[1]));
        const encodedParams = Web3Service.web3.eth.abi.encodeParameters(params, values);
        const votingData = encodedParams.replace('0x', methodSelector);
        this.votingData = votingData;
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
  };

  constructor() {
    super();
    this.state = {
      isSelected: false,
    };
  }

  // eslint-disable-next-line consistent-return
  handleSelect = (selected) => {
    const { form } = this;
    const { projectStore, dialogStore } = this.props;
    const { questionStore } = projectStore;
    const [question] = questionStore.getQuestionById(selected.value);
    const { params } = question;

    // @ Clearing fields, except question selection dropdown
    // eslint-disable-next-line array-callback-return
    form.map((field) => {
      if (field.name === 'question') return;
      form.del(field.name);
    });

    // @ If Question have dedicaated modal, then toggle them, else create fields
    switch (selected.value) {
      case 1:
        dialogStore.toggle('create_question');
        break;
      case 3:
        dialogStore.toggle('create_group_question');
        break;
      default:
        this.createFields(params);
    }
    this.setState({ isSelected: true });
  }

  // eslint-disable-next-line class-methods-use-this
  createFields(params) {
    // eslint-disable-next-line array-callback-return
    params.map(([name]) => {
      this.form.add({
        name,
        type: 'text',
        label: 'parameter',
        placeholder: name,
        rules: 'required',
      });
    });
  }

  render() {
    const { form } = this;
    const { isSelected } = this.state;
    const { props } = this;
    const { t, projectStore } = props;
    const { questionStore: { options } } = projectStore;
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
              options={options}
              field={form.$('question')}
              onSelect={this.handleSelect}
            >
              <QuestionIcon />
            </SimpleDropdown>
            {
              isSelected
                ? (
                  <div className={styles['new-vote__description']}>
                    Решаем вводить ли новую охренительную методологию разработки или да
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
                      return (
                        <div className={styles['new-vote__form-col']}>
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
