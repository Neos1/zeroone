import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
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


@withTranslation()
@inject('projectStore', 'dialogStore')
@observer
class Questions extends Component {
  passwordForm = new FinPassForm({
    hooks: {
      onSuccess: () => Promise.resolve(),
      onError: () => Promise.reject(),
    },
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, projectStore, dialogStore } = this.props;
    // eslint-disable-next-line no-console
    const { questionStore: { options, questions } } = projectStore;
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
              />
            </div>
          </div>
          <div className={styles.questions__wrapper}>
            {
              questions.map((question) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Question {...question} />
              ))
            }
          </div>
        </div>
        <Dialog name="create_group_question" size="md" footer={null}>
          <CreateGroupQuestions />
        </Dialog>
        <Dialog name="create_question" size="xlg" footer={null}>
          <CreateNewQuestion />
        </Dialog>
        <Dialog name="password_form" size="md" footer={null}>
          <FinPasswordFormWrapper form={this.passwordForm} />
        </Dialog>
        <Footer />
      </Container>
    );
  }
}

Questions.propTypes = {
  t: propTypes.func.isRequired,
  projectStore: propTypes.shape({
    questionStore: propTypes.shape({
      questions: propTypes.arrayOf(propTypes.shape({})).isRequired,
      options: propTypes.arrayOf(propTypes.shape({
        value: propTypes.number.isRequired,
        label: propTypes.string.isRequired,
      })).isRequired,
    }),
  }).isRequired,
  dialogStore: propTypes.shape({
    show: propTypes.func.isRequired,
  }).isRequired,
};
export default Questions;
