import React from 'react';
import { shallow } from 'enzyme';
import TransferTokenInProgress from './TransferTokenInProgress';

describe('TransferTokenInProgress', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TransferTokenInProgress />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.dialog__loader').length).toEqual(1);
  });
});
