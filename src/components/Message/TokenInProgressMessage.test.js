import React from 'react';
import { shallow } from 'enzyme';
import TokenInProgressMessage from './TokenInProgressMessage';

describe('TokenInProgressMessage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TokenInProgressMessage />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
