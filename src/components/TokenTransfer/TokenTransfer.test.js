import React from 'react';
import { shallow } from 'enzyme';
import TokenTransfer from './TokenTransfer';

describe('TokenTransfer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TokenTransfer />).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
