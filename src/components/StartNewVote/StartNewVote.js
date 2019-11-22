/* eslint-disable react/static-property-placement */
import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import { QuestionUploadingIcon, Address } from '../Icons';
import { Button } from '../Button';
import Input from '../Input';
import StarNewVoteForm from '../../stores/FormsStore/StartNewVoteForm';

import styles from './StartNewVote.scss';

@withTranslation()
@observer
class StartNewVote extends React.Component {
  form = new StarNewVoteForm({
    hooks: {
      onSuccess() {
        return Promise.resolve();
      },
      onError() {},
    },
  });

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelected: false,
    };
  }

  handleSelect = () => {
    this.setState({ isSelected: true });
  }

  render() {
    const { form } = this;
    const { isSelected } = this.state;
    const { props } = this;
    const { t } = props;
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
            <Dropdown
              options={[{
                label: 'Методология разработки',
              }]}
              field={{ set: () => {} }}
              onSelect={this.handleSelect}
            >
              <QuestionUploadingIcon />
            </Dropdown>
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
                    <div className={styles['new-vote__form-col']}>
                      <Input field={form.$('duration')}>
                        <Address />
                      </Input>
                    </div>
                    <div className={styles['new-vote__form-col']}>
                      <Input field={form.$('date')}>
                        <Address />
                      </Input>
                    </div>
                  </div>
                  <div className={styles['new-vote__form-row']}>
                    <div className={styles['new-vote__form-col']}>
                      <Input field={form.$('param1')}>
                        <Address />
                      </Input>
                    </div>
                    <div className={styles['new-vote__form-col']}>
                      <Input field={form.$('param2')}>
                        <Address />
                      </Input>
                    </div>
                  </div>
                  <div className={styles['new-vote__form-row']}>
                    <div className={styles['new-vote__form-col']}>
                      <Input field={form.$('param3')}>
                        <Address />
                      </Input>
                    </div>
                  </div>
                  <div className={styles['new-vote__form-row']}>
                    <div className={styles['new-vote__form-col']} />
                    <div className={styles['new-vote__form-col']}>
                      {/* TODO fix button after refactor */}
                      <Button
                        className="btn--default btn--black"
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
