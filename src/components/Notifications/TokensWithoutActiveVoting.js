import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from '../Button/Button';

@withTranslation()
class TokensWithoutActiveVoting extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  handleClick = () => {
    console.log('return tokens');
  }

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <>
        {t('other:votingCompletedButTokensInContract')}
        <Button
          theme="link"
          onClick={this.handleClick}
        >
          {t('buttons:pickUpTokensCapital')}
        </Button>
      </>
    );
  }
}

export default TokensWithoutActiveVoting;
