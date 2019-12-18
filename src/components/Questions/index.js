import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Container from '../Container';
import Button from '../Button/Button';
import { CreateToken } from '../Icons';
import styles from './Questions.scss';
import SimpleDropdown from '../SimpleDropdown';
import Footer from '../Footer';
import Dialog from '../Dialog/Dialog';
import Question from './Question';
import CreateGroupQuestions from '../CreateGroupQuestions/CreateGroupQuestions';
import CreateNewQuestion from '../CreateNewQuestion/CreateNewQuestion';
import FinPasswordFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import Pagination from '../Pagination';
import PaginationStore from '../../stores/PaginationStore';
import FilterStore from '../../stores/FilterStore/FilterStore';
import Loader from '../Loader';
import Notification from '../Notification/Notification';

@withRouter
@withTranslation()
@inject('projectStore', 'dialogStore')
@observer
class Questions extends Component {
  passwordForm = new FinPassForm({
    hooks: {
      onSuccess: () => {
        const { props } = this;
        const { history, dialogStore } = props;
        dialogStore.hide();
        history.push('/votings');
        return Promise.resolve();
      },
      onError: () => Promise.reject(),
    },
  });

  static propTypes = {
    t: propTypes.func.isRequired,
    projectStore: propTypes.shape({
      questionStore: propTypes.shape({
        loading: propTypes.bool.isRequired,
        questions: propTypes.arrayOf(propTypes.shape({})).isRequired,
        questionGroups: propTypes.arrayOf(propTypes.shape({
          value: propTypes.number.isRequired,
          label: propTypes.string.isRequired,
        })).isRequired,
        pagination: propTypes.instanceOf(PaginationStore).isRequired,
        addFilterRule: propTypes.func.isRequired,
        resetFilter: propTypes.func.isRequired,
        filter: propTypes.instanceOf(FilterStore).isRequired,
        list: propTypes.arrayOf(
          propTypes.shape(),
        ).isRequired,
        paginatedList: propTypes.arrayOf(
          propTypes.shape(),
        ).isRequired,
      }),
    }).isRequired,
    dialogStore: propTypes.shape({
      show: propTypes.func.isRequired,
      hide: propTypes.func.isRequired,
    }).isRequired,
    history: propTypes.shape({
      push: propTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Method for handle sort
   *
   * @param {string} selected new sort value
   */
  handleSortSelect = (selected) => {
    const { projectStore } = this.props;
    const {
      questionStore: {
        addFilterRule,
      },
    } = projectStore;
    addFilterRule({ caption: selected });
  }

  render() {
    const { t, projectStore, dialogStore } = this.props;
    const {
      questionStore: {
        loading,
        pagination,
        questionGroups,
        paginatedList,
      },
    } = projectStore;
    const questions = paginatedList;
    return (
      <Container className="container--small">
        <Notification />
        <div className={styles.questions}>
          {
              !loading
                ? (
                  <div className={styles.questions__head}>
                    <div className={styles['questions__head-create']}>
                      <Button
                        theme="white"
                        icon={<CreateToken />}
                        onClick={() => { dialogStore.show('create_group_question'); }}
                      >
                        {t('buttons:createQuestionGroup')}
                      </Button>
                      <Button
                        theme="white"
                        icon={<CreateToken />}
                        onClick={() => { dialogStore.show('create_question'); }}
                      >
                        {t('buttons:createQuestion')}
                      </Button>
                    </div>
                    <div className={styles['questions__head-filters']}>
                      <SimpleDropdown
                        options={questionGroups}
                        onSelect={this.handleSortSelect}
                      />
                    </div>
                  </div>
                )
                : null
            }

          <div className={styles.questions__wrapper}>
            {
              !loading
                ? questions.map((question) => (
                  <Question
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...question}
                    key={`question__item--${question.id}`}
                  />
                ))
                : <Loader />
            }
          </div>
          {
            !loading
              ? (
                <Pagination
                  activePage={pagination.activePage}
                  lastPage={pagination.lastPage}
                  handlePageChange={pagination.handleChange}
                  itemsCountPerPage={pagination.itemsCountPerPage}
                  totalItemsCount={pagination.totalItemsCount}
                  pageRangeDisplayed={pagination.pageRangeDisplayed}
                />
              )
              : null
          }
        </div>
        <Dialog name="create_group_question" size="md" footer={null}>
          <CreateGroupQuestions />
        </Dialog>
        <Dialog name="create_question" size="xlg" footer={null}>
          <CreateNewQuestion />
        </Dialog>
        <Dialog
          name="password_form"
          size="md"
          footer={null}
          header={t('fields:enterPassword')}
        >
          <FinPasswordFormWrapper form={this.passwordForm} />
        </Dialog>
        <Footer />
      </Container>
    );
  }
}

export default Questions;
