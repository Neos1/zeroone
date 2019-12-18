import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from '../Button/Button';

@withTranslation()
class TokensWithActiveVoting extends React.Component {
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
        {t('other:youVotedAndTokensInContract')}
        <Button
          theme="link"
          onClick={this.handleClick}
        >
          {t('buttons:pickUpTokens')}
        </Button>
      </>
    );
  }
}

export default TokensWithActiveVoting;
