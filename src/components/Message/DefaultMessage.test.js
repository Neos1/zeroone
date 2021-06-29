import React from 'react';
import { shallow } from 'enzyme';
import DefaultMessage from './DefaultMessage';

describe('DefaultMessage', () => {
  it('should render without error with required props', () => {
    const wrapper = shallow(
      <DefaultMessage
        title="message title"
      />,
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.message__title').text()).toEqual('message title');
  });

  it('should render without error with optional props', () => {
    const wrapper = shallow(
      <DefaultMessage
        title="message title"
      >
        <div className="content">content</div>
      </DefaultMessage>,
    );
    expect(wrapper.find('.message__title').text()).toEqual('message title');
    expect(wrapper.find('.content').text()).toEqual('content');
    expect(wrapper.length).toEqual(1);
  });
});
