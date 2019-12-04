import React from 'react';
import { shallow } from 'enzyme';
import { DecisionReject, DecisionAgree } from '.';

describe('DecisionReject', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DecisionReject />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('DecisionAgree', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DecisionAgree />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
