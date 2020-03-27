import React from 'react';
import { shallow } from 'enzyme';
import VoterListTable from './VoterListTable';

describe('VoterListTable', () => {
  describe('List is empty', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VoterListTable
          list={[]}
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
    });
  });

  describe('List with correct data', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VoterListTable
          list={
            [
              {
                wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
                weight: 2,
                isAdmin: true,
              },
              {
                wallet: '0x3460dfgds7f6786df76g98d7s6fg76df87g6d76f',
                weight: 15,
              },
            ]
          }
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.voter-list__table-tr').length).toEqual(2);
      expect(
        wrapper.find('.voter-list__table-tr').at(0).text(),
      ).toEqual('<AdminIcon />0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc542%');
    });
  });
});
