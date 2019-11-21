import MembersStore from './MembersStore';

describe('MembersStore', () => {
  describe('correct input data', () => {
    let memberStore;

    beforeEach(() => {
      memberStore = new MembersStore([
        {
          name: 'Admins',
          description: 'short description for group',
          customTokenName: 'TKN',
          tokenName: 'ERC20',
          list: [
            {
              wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
              weight: 20,
              balance: 100,
              customTokenName: 'TKN',
            },
          ],
        },
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
});
