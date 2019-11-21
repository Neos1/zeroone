import MembersStore from './MembersStore';

describe('MembersStore', () => {
  const defaultGroup = {
    name: 'Admins',
    description: 'short description for group',
    customTokenName: 'TKN',
    tokenName: 'ERC20',
    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
    list: [
      {
        wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
        weight: 20,
        balance: 100,
        customTokenName: 'TKN',
      },
    ],
  };

  describe('correct input data', () => {
    let memberStore;

    beforeEach(() => {
      memberStore = new MembersStore([
        defaultGroup,
      ]);
    });

    it('should create without error', () => {
      expect(memberStore).toBeTruthy();
    });

    it('list length should be equal 1', () => {
      expect(memberStore.list.length).toEqual(1);
    });
  });

  it('should cause error with incorrect data', () => {
    expect(
      () => (new MembersStore({ data: 1 })),
    ).toThrow(new Error('Incorrect groups provided'));
  });

  it('store with textEmptyForState should be correct', () => {
    const memberStore = new MembersStore([
      {
        ...defaultGroup,
        textEmptyForState: 'text for empty',
      },
    ]);
    expect(memberStore).toBeTruthy();
  });
});
