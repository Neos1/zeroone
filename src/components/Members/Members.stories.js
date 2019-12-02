import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import MembersTop from './MembersTop';
import MembersGroupComponent from './MembersGroupComponent';
import MemberItem from '../../stores/MembersStore/MemberItem';

storiesOf('Members', module)
  .add('MembersTop', () => (
    <MembersTop
      projectName="project test"
    />
  ))
  .add('MembersGroupComponent with list', () => (
    <MembersGroupComponent
      name="Менеджеры"
      description="Могут голосовать только по вопросам из групп: “Дизайн”, “Верстка”, “Бэкэнд”"
      wallet="0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54"
      balance="0,000654"
      customTokenName="TKN"
      tokenName="Кастомные токены"
      list={[
        new MemberItem({
          wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
          weight: 25,
          balance: '0,000004',
          customTokenName: 'TKN',
          isAdmin: true,
        }),
        new MemberItem({
          wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
          weight: 25,
          balance: '0,000004',
          customTokenName: 'TKN',
        }),
      ]}
      id={0}
      key="memberGroup--1"
      textForEmptyState="Text for empty state"
    />
  ))
  .add('MembersGroupComponent with empty list', () => (
    <MembersGroupComponent
      name="Менеджеры"
      description="Могут голосовать только по вопросам из групп: “Дизайн”, “Верстка”, “Бэкэнд”"
      wallet="0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54"
      balance="0,000654"
      customTokenName="TKN"
      tokenName="Кастомные токены"
      list={[]}
      id={0}
      key="memberGroup--1"
      textForEmptyState="Text for empty state"
    />
  ));
