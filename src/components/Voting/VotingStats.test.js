import React from 'react';
import { shallow } from 'enzyme';
import VotingStats from './VotingStats';

describe('VotingStats', () => {
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    wrapper = shallow(<VotingStats />).dive();
    wrapperInstance = wrapper.instance();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('renderLabel should return correct data', () => {
    const label = wrapperInstance.renderLabel({
      x: 20,
      y: 100,
      width: 200,
      value: 60,
    }, 'pros');
    expect(label.props.x).toEqual(120);
    expect(label.props.y).toEqual(90);
  });
});
