import React from 'react';
import { shallow } from 'enzyme';
import { Trans } from 'react-i18next';
import { MembersTop } from '.';

describe('MembersTop', () => {
  it('should render correct without onClick props', () => {
    const wrapper = shallow(<MembersTop projectName="test" />).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(Trans).props().values).toEqual({ project: 'test' });
  });

  it('button onClick should call mockClick with onClick prop', () => {
    const mockClick = jest.fn();
    const wrapper = shallow(
      <MembersTop
        onClick={mockClick}
        projectName="test project"
      />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(Trans).props().values).toEqual({ project: 'test project' });
    const button = wrapper.find('button');
    button.prop('onClick')();
    expect(mockClick).toHaveBeenCalled();
  });
});
