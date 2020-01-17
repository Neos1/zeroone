import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Input from '../Input';
import { TokenName, Password, BackIcon } from '../Icons';
import Button from '../Button/Button';
import Explanation from '../Explanation';
import CreateProjectForm from '../../stores/FormsStore/CreateProject';

import styles from '../Login/Login.scss';

@withTranslation()
@observer
class InputProjectData extends React.Component {
  static propTypes = {
    form: PropTypes.instanceOf(CreateProjectForm).isRequired,
    onClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { props } = this;
    const { onClick, form, t } = props;
    return (
      <FormBlock>
        <Heading>
          {t('headings:projectCreating.heading')}
          <span>
            {t('headings:projectCreating.subheading.0')}
            <br />
            {t('headings:projectCreating.subheading.1')}
          </span>
        </Heading>
        <form form={form} onSubmit={form.onSubmit}>
          <Input field={form.$('name')}>
            <TokenName />
          </Input>
          <Input field={form.$('password')}>
            <Password />
          </Input>
          <div className={styles.form__submit}>
            <Button theme="black" size="310" disabled={form.loading} type="submit">
              {t('buttons:continue')}
            </Button>
          </div>
          <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
            <Explanation>
              <p>
                {t('explanations:project.name')}
              </p>
            </Explanation>
          </div>
          <Button theme="back" icon={<BackIcon />} onClick={onClick} disabled={form.loading}>
            {t('buttons:back')}
          </Button>
        </form>
      </FormBlock>
    );
  }
}

export default InputProjectData;
