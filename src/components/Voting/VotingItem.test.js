import React from 'react';
import { shallow } from 'enzyme';
import VotingItem from './VotingItem';
import VotingDecision from './VotingDecision';
import VotingDecisionProgress from './VotingDecisionProgress';

describe('VotingItem', () => {
  describe('actualStatus is cons', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VotingItem
          index={0}
          title="Stop mining farm"
          description="Some description for voting"
          actualStatus="cons"
          date={{
            start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
            end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
          }}
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find(VotingDecision).props()).toEqual({ prosState: false });
    });
  });

  describe('actualStatus is pros', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VotingItem
          index={0}
          title="Stop mining farm"
          description="Some description for voting"
          actualStatus="pros"
          date={{
            start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
            end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
          }}
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find(VotingDecision).props()).toEqual({ prosState: true });
    });
  });

  describe('actualStatus in progress', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VotingItem
          index={0}
          title="Stop mining farm"
          description="Some description for voting"
          actualStatus="progress"
          date={{
            start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
            end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
          }}
        />,
      ).dive();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find(VotingDecisionProgress).length).toEqual(1);
    });
  });
});
