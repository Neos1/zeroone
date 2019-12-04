import React from 'react';
import { shallow } from 'enzyme';
import RejectMessage from './RejectMessage';
import Button from '../Button/Button';

describe('RejectMessage', () => {
  let wrapper;
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
    wrapper = shallow(
      <RejectMessage
        onButtonClick={mockOnClick}
      />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should call mockOnClick on button onClick', () => {
    const button = wrapper.find(Button);
    expect(button.length).toEqual(1);
    button.prop('onClick')();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render correct without onButtonClick', async () => {
    const wrapperCustom = shallow(
      <RejectMessage />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapperCustom.find(Button).length).toEqual(0);
  });
});
