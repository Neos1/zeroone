import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Container from '../Container';
import Button from '../Button/Button';
import { CreateToken } from '../Icons';
import Question from './Question';
import styles from './Questions.scss';
import SimpleDropdown from '../SimpleDropdown';
import Footer from '../Footer';
import Dialog from '../Dialog/Dialog';
import CreateGroupQuestions from '../CreateGroupQuestions/CreateGroupQuestions';
import CreateNewQuestion from '../CreateNewQuestion/CreateNewQuestion';
import FinPasswordFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import Pagination from '../Pagination';
import PaginationStore from '../../stores/PaginationStore';
import DataManagerStore from '../../stores/DataManagerStore';

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
        questions: propTypes.arrayOf(propTypes.shape({})).isRequired,
        options: propTypes.arrayOf(propTypes.shape({
          value: propTypes.number.isRequired,
          label: propTypes.string.isRequired,
        })).isRequired,
        pagination: propTypes.instanceOf(PaginationStore).isRequired,
        dataManager: propTypes.instanceOf(DataManagerStore).isRequired,
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

  componentDidMount() {
    const { projectStore } = this.props;
    const {
      questionStore: {
        pagination,
        dataManager,
      },
    } = projectStore;
    pagination.update({
      key: 'activePage',
      value: 1,
    });
    dataManager.reset();
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
        pagination,
        dataManager,
      },
    } = projectStore;
    pagination.update({
      key: 'activePage',
      value: 1,
    });
    dataManager.addRule({ caption: selected });
  }

  render() {
    const { t, projectStore, dialogStore } = this.props;
    const {
      questionStore: {
        options, pagination, dataManager,
      },
    } = projectStore;
    const questions = dataManager.list();
    return (
      <Container className="container--small">
        <div className={styles.questions}>
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
                options={options}
                onSelect={this.handleSortSelect}
              />
            </div>
          </div>
          <div className={styles.questions__wrapper}>
            {
              questions.map((question) => (
                <Question
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...question}
                  key={`question__item--${question.id}`}
                />
              ))
            }
          </div>
          <Pagination
            activePage={pagination.activePage}
            lastPage={pagination.lastPage}
            handlePageChange={pagination.handleChange}
            itemsCountPerPage={pagination.itemsCountPerPage}
            totalItemsCount={pagination.totalItemsCount}
            pageRangeDisplayed={pagination.pageRangeDisplayed}
          />
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
