/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import Container from '../Container';
import MembersTop from './MembersTop';
import MembersGroup from '../../stores/MembersStore/MembersGroup';
import MembersGroupComponent from './MembersGroupComponent';

// import styles from './nameClass.css';

/**
 * Component for page with members
 */
@withTranslation()
@inject('membersStore')
@observer
class MembersPage extends React.Component {
  static propTypes = {
    membersStore: PropTypes.shape({
      addToGroups: PropTypes.func.isRequired,
      list: MobxPropTypes.observableArrayOf(MembersGroup),
    }).isRequired,
  }

  componentDidMount() {
    const { membersStore } = this.props;
    // TODO change on real data
    membersStore.addToGroups({
      name: 'Администраторы',
      description: 'Могут голосовать по любым вопросам.',
      wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
      balance: '11,510156',
      customTokenName: 'TKN',
      tokenName: 'ERC20',
      textForEmptyState: 'other:noDataAdmins',
      list: [],
    });
    membersStore.addToGroups({
      name: 'Менеджеры',
      description: 'Могут голосовать только по вопросам из групп: “Дизайн”, “Верстка”, “Бэкэнд”',
      wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
      balance: '0,000654',
      customTokenName: 'TKN',
      tokenName: 'Кастомные токены',
      list: [
        {
          wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
          weight: 25,
          balance: '0,000004',
          customTokenName: 'TKN',
        },
        {
          wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
          weight: 25,
          balance: '0,000004',
          customTokenName: 'TKN',
        },
      ],
    });
  }

  render() {
    const { membersStore: { list } } = this.props;
    const groups = list.toJS();
    return (
      <Container>
        <MembersTop
          onClick={() => {
            console.log('click');
          }}
        />
        <div>
          {
            groups.map((group, index) => (
              <MembersGroupComponent
                id={index}
                name={group.name}
                fullBalance={group.fullBalance}
                key={`memberGroup--${index + 1}`}
                description={group.description}
                wallet={group.wallet}
                token={group.tokenName}
                list={group.list}
                text={group.list}
                textForEmptyState={group.textForEmptyState}
              />
            ))
          }
        </div>
      </Container>
    );
  }
}

export default MembersPage;
