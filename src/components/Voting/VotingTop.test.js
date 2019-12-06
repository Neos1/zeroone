import React from 'react';
import { shallow } from 'enzyme';
import VotingTop from './VotingTop';

describe('VotingTop', () => {
  it('should render correct without onClick props', () => {
    const wrapper = shallow(<VotingTop />).dive();
    expect(wrapper.length).toEqual(1);
  });

  it('button onClick should call mockClick with onClick prop', () => {
    const mockClick = jest.fn();
    const wrapper = shallow(
      <VotingTop
        onClick={mockClick}
      />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    const button = wrapper.find('button');
    button.prop('onClick')();
    expect(mockClick).toHaveBeenCalled();
  });
});
