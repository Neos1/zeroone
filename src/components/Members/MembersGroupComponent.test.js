import React from 'react';
import { shallow } from 'enzyme';
import MembersGroupComponent from './MembersGroupComponent';
import MemberItem from '../../stores/MembersStore/MemberItem';
import MembersGroupTable from './MembersGroupTable';

describe('MembersGroupComponent', () => {
  const defaultProps = {
    id: 0,
    name: 'Admins',
    fullBalance: '0.1201 TKN',
    description: 'description text',
    wallet: '0xA234FA767ASD7F67HH34HF7DF7S',
    token: 'ERC 20',
    textForEmptyState: 'textForEmptyState',
    list: [],
  };

  describe('With correct data, list is empty', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(
        <MembersGroupComponent
          /* eslint-disable-next-line */
          {...defaultProps}
        />,
      ).dive();
      instance = wrapper.instance();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.members__group-id').text()).toEqual('#0');
      expect(wrapper.find('.members__group-name').text()).toEqual('Admins');
      expect(wrapper.find('.members__group-description').text()).toEqual('description text');
      expect(wrapper.find('.members__group-wallet').text()).toEqual('0xA234FA767ASD7F67HH34HF7DF7S');
      expect(wrapper.find('.members__group-token').text()).toEqual('ERC 20');
      expect(wrapper.find('.members__group-no-data-text').text()).toEqual('textForEmptyState');
      expect(wrapper.find('.members__group-button').prop('onClick')).toEqual(instance.toggleOpen);
    });

    it('toggleOpen should change isOpen state', () => {
      expect(instance.state.isOpen).toEqual(false);
      instance.toggleOpen();
      expect(instance.state.isOpen).toEqual(true);
      instance.toggleOpen();
      expect(instance.state.isOpen).toEqual(false);
    });
  });

  describe('With correct data, list have items', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <MembersGroupComponent
          /* eslint-disable-next-line */
          {...defaultProps}
          list={[
            new MemberItem({
              wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
              weight: 20,
              balance: 100,
              customTokenName: 'TKN',
              isAdmin: true,
            }),
            new MemberItem({
              wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
              weight: 20,
              balance: 100,
              customTokenName: 'TKN',
              isAdmin: false,
            }),
          ]}
        />,
      ).dive();
    });

    it('should render correct with correct prop data', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find(MembersGroupTable).prop('list')).toEqual([
        new MemberItem({
          wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
          weight: 20,
          balance: 100,
          customTokenName: 'TKN',
          isAdmin: true,
        }),
        new MemberItem({
          wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
          weight: 20,
          balance: 100,
          customTokenName: 'TKN',
          isAdmin: false,
        }),
      ]);
    });
  });
});
