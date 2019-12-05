import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button/Button';
import TransferSuccessMessage from './TransferSuccessMessage';
import { EMPTY_DATA_STRING } from '../../constants';

describe('TransferSuccessMessage', () => {
  let wrapper;
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
    wrapper = shallow(
      <TransferSuccessMessage
        onButtonClick={mockOnClick}
      />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.value').text()).toEqual(EMPTY_DATA_STRING);
  });

  it('should call mockOnClick on button onClick', () => {
    const button = wrapper.find(Button);
    expect(button.length).toEqual(1);
    button.prop('onClick')();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render without error & with correct data', () => {
    const wrapperCustom = shallow(
      <TransferSuccessMessage
        onButtonClick={mockOnClick}
        value="0.1234 TKN"
      />,
    ).dive();
    expect(wrapperCustom.find('.value').text()).toEqual('0.1234 TKN');
  });

  it('should render correct without onButtonClick', async () => {
    const wrapperCustom = shallow(
      <TransferSuccessMessage
        value="0.1234 TKN"
      />,
    ).dive();
    expect(wrapper.length).toEqual(1);
    expect(wrapperCustom.find(Button).length).toEqual(0);
  });
});
