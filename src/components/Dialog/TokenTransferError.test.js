import React from 'react';
import { shallow } from 'enzyme';
import TokenTransferError from './TokenTransferError';

describe('TokenTransferError', () => {
  it('should render correct without value', () => {
    const wrapper = shallow(
      <TokenTransferError />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.dialog__subtext').text()).toEqual('other:notEnoughTokens');
  });
});
