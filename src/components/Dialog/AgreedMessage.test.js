import React from 'react';
import { shallow } from 'enzyme';
import AgreedMessage from './AgreedMessage';

describe('AgreedMessage', () => {
  let wrapper;
  let instance;
  let mockHide;

  beforeEach(() => {
    mockHide = jest.fn();
    wrapper = shallow(
      <AgreedMessage
        dialogStore={{
          hide: mockHide,
        }}
      />,
    ).dive().dive();
    instance = wrapper.instance();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('hide method should call mockHide', () => {
    instance.hide();
    expect(mockHide).toHaveBeenCalled();
  });
});
