import React from 'react';
import { shallow } from 'enzyme';
import Notification from '.';
import NotificationStore from '../../stores/NotificationStore';

describe('Notification', () => {
  it('should render without error', () => {
    const notificationStore = new NotificationStore();
    const wrapper = shallow(
      <Notification
        notificationStore={notificationStore}
      />,
    ).dive();
    expect(wrapper.length).toEqual(1);
  });

  it('should has correct content in open state', () => {
    const notificationStore = new NotificationStore();
    notificationStore.setIsOpen(true);
    notificationStore.setContent('test content');
    const wrapper = shallow(
      <Notification
        notificationStore={notificationStore}
      />,
    ).dive();
    expect(wrapper.find('.notification').text()).toEqual('test content');
  });
});
