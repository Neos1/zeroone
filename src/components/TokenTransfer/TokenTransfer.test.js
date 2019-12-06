import React from 'react';
import { shallow } from 'enzyme';
import TokenTransfer from './TokenTransfer';

jest.mock('../../utils/Validator');

describe('TokenTransfer', () => {
  it('should render correct without "wallet" prop', () => {
    const wrapper = shallow(<TokenTransfer />).dive();
    expect(wrapper.length).toEqual(1);
  });

  it('should render correct with props', () => {
    const wrapper = shallow(
      <TokenTransfer
        wallet="0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54"
      />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.wallet__wrapper').text()).toEqual('0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54');
  });
});
