import React from 'react';
import { shallow } from 'enzyme';
import VotingItem from './VotingItem';
import VotingDecision from './VotingDecision';
import VotingDecisionProgress from './VotingDecisionProgress';

describe('VotingItem', () => {
  describe('actualState is cons', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VotingItem
          index={0}
          title="Stop mining farm"
          description="Some description for voting"
          actualState="cons"
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

  describe('actualState is pros', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VotingItem
          index={0}
          title="Stop mining farm"
          description="Some description for voting"
          actualState="pros"
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

  describe('actualState in progress', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <VotingItem
          index={0}
          title="Stop mining farm"
          description="Some description for voting"
          actualState="progress"
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
