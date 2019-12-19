import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Button from '../Button/Button';
import DialogStore from '../../stores/DialogStore';
import ReturnTokens from '../ReturnTokens/ReturnTokens';

@withTranslation()
@inject('dialogStore')
class TokensWithActiveVoting extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.instanceOf(DialogStore).isRequired,
  };

  handleClick = () => {
    const { props } = this;
    const { dialogStore } = props;
    dialogStore.show('return_tokens');
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
        <ReturnTokens />
      </>
    );
  }
}

export default TokensWithActiveVoting;
