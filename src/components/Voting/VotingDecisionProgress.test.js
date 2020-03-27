import React from 'react';
import { shallow } from 'enzyme';
import VotingDecisionProgress from './VotingDecisionProgress';

describe('VotingDecisionProgress', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <VotingDecisionProgress
        progress={87}
        remained="22 ч 15 мин"
      />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
