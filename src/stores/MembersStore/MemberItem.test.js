import MemberItem from './MemberItem';

describe('MemberItem', () => {
  const defaultProps = {
    wallet: '0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54',
    weight: 5,
    balance: 120,
    customTokenName: 'TKN',
  };

  describe('With correct data', () => {
    let memberItem;

    beforeEach(() => {
      memberItem = new MemberItem(defaultProps);
    });

    it('should has correct data', () => {
      expect(memberItem.wallet).toEqual('0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54');
      expect(memberItem.weight).toEqual(5);
      expect(memberItem.balance).toEqual(120);
      expect(memberItem.customTokenName).toEqual('TKN');
    });

    it('fullBalance should be correct', () => {
      expect(memberItem.fullBalance).toEqual('120 TKN');
    });
  });

  it('should cause error without wallet', () => {
    expect(
      () => (new MemberItem({ ...defaultProps, wallet: null })),
    ).toThrow(new Error('Incorrect data provided for MemberItem!'));
  });

  it('should cause error without weight', () => {
    expect(
      () => (new MemberItem({ ...defaultProps, weight: null })),
    ).toThrow(new Error('Incorrect data provided for MemberItem!'));
  });

  it('should cause error without balance', () => {
    expect(
      () => (new MemberItem({ ...defaultProps, balance: null })),
    ).toThrow(new Error('Incorrect data provided for MemberItem!'));
  });

  it('should cause error without customTokenName', () => {
    expect(
      () => (new MemberItem({ ...defaultProps, customTokenName: null })),
    ).toThrow(new Error('Incorrect data provided for MemberItem!'));
  });
});
