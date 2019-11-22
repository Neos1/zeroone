import React from 'react';
import { shallow } from 'enzyme';
import { MembersTop } from '.';

describe('MembersTop', () => {
  it('should render correct without props', () => {
    const wrapper = shallow(<MembersTop />).dive();
    expect(wrapper.length).toEqual(1);
  });

  it('button onClick should call mockClick with onClick prop', () => {
    const mockClick = jest.fn();
    const wrapper = shallow(
      <MembersTop
        onClick={mockClick}
      />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    const button = wrapper.find('button');
    button.prop('onClick')();
    expect(mockClick).toHaveBeenCalled();
  });
});
