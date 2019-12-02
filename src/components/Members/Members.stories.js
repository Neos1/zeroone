import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import MembersTop from './MembersTop';
import MembersGroupComponent from './MembersGroupComponent';
import MembersStore from '../../stores/MembersStore/MembersStore';

const memberStore = new MembersStore([]);

memberStore.addToGroups({
  name: 'Менеджеры',
  description: 'Могут голосовать только по вопросам из групп: “Дизайн”, “Верстка”, “Бэкэнд”',
  wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
  balance: '0,000654',
  customTokenName: 'TKN',
  tokenName: 'Кастомные токены',
  textForEmptyState: 'other:noDataAdmins',
  list: [
    {
      wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
      weight: 25,
      balance: '0,000004',
      customTokenName: 'TKN',
      isAdmin: true,
    },
    {
      wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
      weight: 25,
      balance: '0,000004',
      customTokenName: 'TKN',
    },
  ],
});

memberStore.addToGroups({
  name: 'Администраторы',
  description: 'Могут голосовать по любым вопросам.',
  wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
  balance: '11,510156',
  customTokenName: 'TKN',
  tokenName: 'ERC20',
  textForEmptyState: 'other:noDataAdmins',
  list: [],
});

const groupWithList = memberStore.groups[0];
const groupWithEmptyList = memberStore.groups[1];

storiesOf('Members', module)
  .add('MembersTop', () => (
    <MembersTop
      projectName="project test"
    />
  ))
  .add('MembersGroupComponent with list', () => (
    <MembersGroupComponent
      id={0}
      name={groupWithList.name}
      fullBalance={groupWithList.fullBalance}
      key="memberGroup--1"
      description={groupWithList.description}
      wallet={groupWithList.wallet}
      token={groupWithList.tokenName}
      list={groupWithList.list}
      textForEmptyState={groupWithList.textForEmptyState}
    />
  ))
  .add('MembersGroupComponent with empty list', () => (
    <MembersGroupComponent
      id={1}
      name={groupWithEmptyList.name}
      fullBalance={groupWithEmptyList.fullBalance}
      key="memberGroup--2"
      description={groupWithEmptyList.description}
      wallet={groupWithEmptyList.wallet}
      token={groupWithEmptyList.tokenName}
      list={groupWithEmptyList.list}
      textForEmptyState={groupWithEmptyList.textForEmptyState}
    />
  ));
