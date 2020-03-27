import React from 'react';
import { shallow } from 'enzyme';
import Voting from '.';

describe('Voting', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Voting />,
    );
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
