import React from 'react';
import { shallow } from 'enzyme';
import { observable } from 'mobx';
import MembersGroupTable from './MembersGroupTable';
import MemberItem from '../../stores/MembersStore/MemberItem';

describe('MembersGroupTable', () => {
  describe('List is empty', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <MembersGroupTable
          onRowClick={() => {}}
          list={observable([])}
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.text()).toEqual('');
    });
  });

  describe('List is not empty', () => {
    let wrapper;
    let mockRowClick;

    beforeEach(() => {
      mockRowClick = jest.fn();
      wrapper = shallow(
        <MembersGroupTable
          onRowClick={mockRowClick}
          list={observable([
            new MemberItem({
              wallet: '0xA234FA767ASD7F67HH34HF7DF7S',
              weight: 10,
              balance: 120,
              customTokenName: 'TKN',
            }),
          ])}
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should have correct text', () => {
      expect(
        wrapper.find('.members__group-table-tr').text(),
      ).toEqual('0xA234FA767ASD7F67HH34HF7DF7S10%120 TKN<BorderArrowIcon />');
    });

    it('row onClick prop should call mockRowClick', () => {
      wrapper.find('.members__group-table-tr').prop('onClick')();
      expect(mockRowClick).toHaveBeenCalled();
    });
  });
});
