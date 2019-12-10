import React from 'react';
import { shallow } from 'enzyme';
import VotingInfoWrapper from './VotingInfoWrapper';

describe('VotingInfoWrapper', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VotingInfoWrapper />).dive().dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
