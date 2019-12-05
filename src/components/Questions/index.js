import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import Button from '../Button/Button';
import { CreateToken } from '../Icons';
import Question from './Question';
import styles from './Questions.scss';
import SimpleDropdown from '../SimpleDropdown';
import Footer from '../Footer';

@withTranslation()
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
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
    const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
              questions.map((id) => (
                <Question id={id} />
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
};
export default Questions;
