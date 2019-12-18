import React from 'react';
import NotificationStore from '.';

describe('NotificationStore', () => {
  let notificationStore;

  beforeEach(() => {
    notificationStore = new NotificationStore();
  });

  it('should have correct init state', () => {
    expect(notificationStore.isOpen).toEqual(false);
    expect(notificationStore.content).toEqual(null);
  });

  it('setIsOpen should work correct', () => {
    expect(notificationStore.isOpen).toEqual(false);
    notificationStore.setIsOpen(true);
    expect(notificationStore.isOpen).toEqual(true);
    notificationStore.setIsOpen(false);
    expect(notificationStore.isOpen).toEqual(false);
  });

  it('setIsOpen should work correct with incorrect input data', () => {
    expect(notificationStore.isOpen).toEqual(false);
    notificationStore.setIsOpen(null);
    expect(notificationStore.isOpen).toEqual(false);
    notificationStore.setIsOpen(1);
    expect(notificationStore.isOpen).toEqual(true);
    notificationStore.setIsOpen(undefined);
    expect(notificationStore.isOpen).toEqual(false);
    notificationStore.setIsOpen('true');
    expect(notificationStore.isOpen).toEqual(true);
  });

  it('setContent should work correct', () => {
    expect(notificationStore.content).toEqual(null);
    notificationStore.setContent('Information notification');
    expect(notificationStore.content).toEqual('Information notification');
    notificationStore.setContent(<span>Notification content</span>);
    expect(notificationStore.content).toEqual(<span>Notification content</span>);
  });
});
