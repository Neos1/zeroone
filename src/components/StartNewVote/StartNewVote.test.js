import React from 'react';
import { shallow } from 'enzyme';
import StartNewVote from '.';

jest.mock('../../utils/Validator');

describe('StartNewVote', () => {
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    wrapper = shallow(<StartNewVote />).dive();
    wrapperInstance = wrapper.instance();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should by default with empty state', () => {
    expect(
      wrapper.find('.new-vote__content--empty-text').length,
    ).toEqual(1);
    expect(
      wrapper.find('.new-vote__content--empty-text').text(),
    ).toEqual('other:newVoteEmptyStateText');
  });

  it('handleSelect should show form instead empty state', () => {
    wrapperInstance.handleSelect();
    expect(wrapper.find('form').length).toEqual(1);
    expect(
      wrapper.find('.new-vote__content--empty-text').length,
    ).toEqual(0);
  });
});
