import React from 'react';
import { shallow } from 'enzyme';
import CreateNewQuestion from './CreateNewQuestion';

describe('CreateNewQuestion', () => {
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    wrapper = shallow(
      <CreateNewQuestion />,
    ).dive();
    wrapperInstance = wrapper.instance();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('handleDropdownSelect should change isSelected to true', async () => {
    expect(wrapperInstance.state.isSelected).toEqual(false);
    wrapperInstance.handleDropdownSelect();
    expect(wrapperInstance.state.isSelected).toEqual(true);
  });

  it('toggleActiveTab with (1) should change activeTab to 1', async () => {
    expect(wrapperInstance.state.activeTab).toEqual(0);
    wrapperInstance.toggleActiveTab(1);
    expect(wrapperInstance.state.activeTab).toEqual(1);
  });
});
