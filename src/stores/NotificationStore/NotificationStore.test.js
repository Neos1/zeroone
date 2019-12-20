import NotificationStore from '.';

describe('NotificationStore', () => {
  let notificationStore;

  beforeEach(() => {
    notificationStore = new NotificationStore();
  });

  it('should have correct init state', () => {
    expect(notificationStore.list).toEqual([]);
  });

  it('add method should work correct', () => {
    notificationStore.add({
      content: 'Content',
      isOpen: true,
    });
    expect(notificationStore.list.length).toEqual(1);
    notificationStore.add({
      content: 'Content',
      isOpen: true,
    });
    expect(notificationStore.list.length).toEqual(2);
  });

  it('remove method should work correct', () => {
    notificationStore.add({
      content: 'Content',
      isOpen: true,
    });
    notificationStore.add({
      content: 'Content',
      isOpen: true,
    });
    expect(notificationStore.list.length).toEqual(2);
    const { id } = notificationStore.list[0];
    notificationStore.remove(id);
    expect(notificationStore.list.length).toEqual(1);
  });

  it('remove for non-exist notification should work correct', () => {
    notificationStore.add({
      content: 'Content',
      isOpen: true,
    });
    notificationStore.add({
      content: 'Content',
      isOpen: true,
    });
    expect(notificationStore.list.length).toEqual(2);
    notificationStore.remove('random_identificator_1');
    expect(notificationStore.list.length).toEqual(2);
  });
});
