/* eslint-disable react/static-property-placement */
import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import PresentationWrapper from './PresentationWrapper';
import {
  TokenTransferDialog,
  TransferTokenInProgress,
  TokenTransferSuccess,
  TokenTransferError,
  DefinetelyAgree,
  DefinetelyReject,
  AgreedMessage,
  RejectMessage,
} from '../Dialog';
import StartNewVoteDialog from '../Dialog/StartNewVoteDialog';
import VoterListDialog from '../Dialog/VoterListDialog';
import { Button } from '../Button';

const colStyle = {
  marginBottom: '10px',
  display: 'inline-block',
  width: '33%',
};

@inject('dialogStore')
class ModalsPage extends React.Component {
  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
    }).isRequired,
  }

  openDialog = (name) => {
    const { props: { dialogStore } } = this;
    dialogStore.show(name);
  }

  closeDialog = (name) => {
    const { props: { dialogStore } } = this;
    dialogStore.hide(name);
  }

  render() {
    return (
      <PresentationWrapper>
        <div style={{ marginTop: '40px' }}>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('new-vote'); }}
            >
              Начать голосование
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('token-transfer'); }}
            >
              Перевести токены
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => {
                this.openDialog('transfer-token-in-progress');
                setTimeout(() => {
                  this.closeDialog();
                }, 4000);
              }}
            >
              Перевод токенов (прелоадер)
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('token-transfer-success'); }}
            >
              Перевод токенов (успешно)
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('transfer-error'); }}
            >
              Перевод токенов (ошибка)
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('definetely-agree'); }}
            >
              Голосовать за
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('definetely-reject'); }}
            >
              Голосовать против
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('agreed-message'); }}
            >
              Вы согласны
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('reject-message'); }}
            >
              Вы против
            </Button>
          </div>
          <div style={colStyle}>
            <Button
              className="btn--default btn--black"
              onClick={() => { this.openDialog('voter-list'); }}
            >
              Список голосования
            </Button>
          </div>
        </div>
        <VoterListDialog />
        <StartNewVoteDialog />
        <TokenTransferDialog />
        <TransferTokenInProgress />
        <TokenTransferSuccess value="0.135125 TKN" />
        <TokenTransferError />
        <DefinetelyAgree />
        <DefinetelyReject />
        <AgreedMessage />
        <RejectMessage />
      </PresentationWrapper>
    );
  }
}

export default ModalsPage;
