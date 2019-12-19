import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  let notificationItem;

  beforeEach(() => {
    notificationItem = new NotificationItem({
      id: 0,
      content: 'test',
    });
  });

  it('should have correct init state', () => {
    expect(notificationItem.id).toEqual(0);
    expect(notificationItem.isOpen).toEqual(false);
    expect(notificationItem.content).toEqual('test');
    expect(notificationItem.content).toEqual('test');
  });

  it('setIsOpen should work correct', () => {
    expect(notificationItem.isOpen).toEqual(false);
    notificationItem.setIsOpen(true);
    expect(notificationItem.isOpen).toEqual(true);
    notificationItem.setIsOpen(false);
    expect(notificationItem.isOpen).toEqual(false);
  });

  it('setIsOpen should work correct with incorrect input data', () => {
    expect(notificationItem.isOpen).toEqual(false);
    notificationItem.setIsOpen(null);
    expect(notificationItem.isOpen).toEqual(false);
    notificationItem.setIsOpen(1);
    expect(notificationItem.isOpen).toEqual(true);
    notificationItem.setIsOpen(undefined);
    expect(notificationItem.isOpen).toEqual(false);
    notificationItem.setIsOpen('true');
    expect(notificationItem.isOpen).toEqual(true);
  });
});
