import React from 'react';
import { shallow } from 'enzyme';
import { observable } from 'mobx';
import { MembersPage } from '.';
import MembersGroup from '../../stores/MembersStore/MembersGroup';

describe('MembersPage', () => {
  describe('List is empty', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <MembersPage
          membersStore={{
            addToGroups: () => {},
            list: observable([]),
          }}
        />,
      ).dive().dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
    });
  });

  describe('List not empty', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <MembersPage
          membersStore={{
            addToGroups: () => {},
            list: observable([
              new MembersGroup({
                name: 'Admins',
                description: 'short description for group',
                customTokenName: 'TKN',
                tokenName: 'ERC20',
                wallet: '0xB210af05Bf82eF6C6BA034B22D18c89B5D23Cc90',
                list: [
                  {
                    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                    weight: 20,
                    balance: 100,
                    customTokenName: 'TKN',
                  },
                ],
              }),
            ]),
          }}
        />,
      ).dive().dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
    });
  });
});
