import React from 'react';
import { shallow } from 'enzyme';
import DefaultDialogFooter from './DefaultDialogFooter';
import { Button } from '../Button';

describe('DefaultDialogFooter', () => {
  let wrapper;
  let mockHide;

  beforeEach(() => {
    mockHide = jest.fn();
    wrapper = shallow(
      <DefaultDialogFooter
        dialogStore={{
          hide: mockHide,
        }}
        t={() => ('test')}
      />,
    ).dive().dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('button prop onClick should call mockHide', () => {
    const button = wrapper.find(Button);
    button.prop('onClick')();
    expect(mockHide).toHaveBeenCalled();
  });
});
