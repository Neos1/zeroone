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

@withTranslation()
@inject('projectStore')
@observer
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, projectStore } = this.props;
    // eslint-disable-next-line no-console
    const options = [{
      label: '1',
      value: '1',
    }, {
      label: '2',
      value: '2',
    }, {
      label: '3',
      value: '3',
    }];
    return (
      <Container className="container--small">
        <div className={styles.questions}>
          <div className={styles.questions__head}>
            <div className={styles['questions__head-create']}>
              <Button theme="white" icon={<CreateToken />}>
                {t('buttons:createQuestionGroup')}
              </Button>
              <Button theme="white" icon={<CreateToken />}>
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
              projectStore.questionStore.questions.map((question) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Question {...question} />
              ))
            }
          </div>
        </div>
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
    }),
  }).isRequired,
};
export default Questions;
