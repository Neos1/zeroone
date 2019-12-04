import React from 'react';
import { shallow } from 'enzyme';
import AgreedMessage from './AgreedMessage';
import Button from '../Button/Button';

describe('AgreedMessage', () => {
  let wrapper;
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
    wrapper = shallow(
      <AgreedMessage
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
});
