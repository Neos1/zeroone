import React from 'react';
import { shallow } from 'enzyme';
import TokenTransferSuccess from './TokenTransferSuccess';
import { EMPTY_DATA_STRING } from '../../constants';

describe('TokenTransferSuccess', () => {
  it('should render correct without value', () => {
    const wrapper = shallow(
      <TokenTransferSuccess />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.dialog__subtext').text()).toEqual('other:yourBalance');
    expect(wrapper.find('.dialog__value').text()).toEqual(EMPTY_DATA_STRING);
  });

  it('should render correct with value', () => {
    const wrapper = shallow(
      <TokenTransferSuccess value="0.22124214 TKN" />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.dialog__subtext').text()).toEqual('other:yourBalance');
    expect(wrapper.find('.dialog__value').text()).toEqual('0.22124214 TKN');
  });
});
