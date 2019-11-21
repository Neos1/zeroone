import React from 'react';
import { shallow } from 'enzyme';
import MembersGroupComponent from './MembersGroupComponent';

describe('MembersGroupComponent', () => {
  const defaultProps = {
    id: 0,
    name: 'Admins',
    fullBalance: '0.1201 TKN',
    description: 'description text',
    wallet: '0xA234FA767ASD7F67HH34HF7DF7S',
    token: 'ERC 20',
    list: [],
  };

  describe('With correct data', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(
        <MembersGroupComponent
          /* eslint-disable-next-line */
          {...defaultProps}
        />,
      );
      instance = wrapper.instance();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.members__group-id').text()).toEqual('#0');
      expect(wrapper.find('.members__group-name').text()).toEqual('Admins');
      expect(wrapper.find('.members__group-description').text()).toEqual('description text');
      expect(wrapper.find('.members__group-wallet').text()).toEqual('0xA234FA767ASD7F67HH34HF7DF7S');
      expect(wrapper.find('.members__group-token').text()).toEqual('ERC 20');
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
});
