import React from 'react';
import { shallow } from 'enzyme';
import VotingDecision from './VotingDecision';
import { VerifyIcon, RejectIcon } from '../Icons';

describe('VotingDecision', () => {
  it('should render without error with true prosState', () => {
    const wrapper = shallow(<VotingDecision prosState />).dive();
    expect(wrapper.find('.voting__decision-state').text()).toEqual('PROS');
    expect(wrapper.find(VerifyIcon).length).toEqual(1);
    expect(wrapper.length).toEqual(1);
  });

  it('should render without error with true prosState', () => {
    const wrapper = shallow(<VotingDecision prosState={false} />).dive();
    expect(wrapper.find('.voting__decision-state').text()).toEqual('CONS');
    expect(wrapper.find(RejectIcon).length).toEqual(1);
    expect(wrapper.length).toEqual(1);
  });
});
