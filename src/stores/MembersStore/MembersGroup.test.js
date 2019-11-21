import MembersGroup from './MembersGroup';

describe('MembersGroup', () => {
  const defaultProps = {
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
  };

  describe('with correct data', () => {
    let membersGroup;

    beforeEach(() => {
      membersGroup = new MembersGroup(defaultProps);
    });

    it('should has correct data', () => {
      expect(membersGroup.name).toEqual('Admins');
      expect(membersGroup.description).toEqual('short description for group');
      expect(membersGroup.customTokenName).toEqual('TKN');
      expect(membersGroup.tokenName).toEqual('ERC20');
      expect(membersGroup.list.length).toEqual(1);
    });
  });

  it('should cause error without name', () => {
    expect(
      () => (new MembersGroup({ ...defaultProps, name: null })),
    ).toThrow(new Error('Incorrect data provided!'));
  });

  it('should cause error without description', () => {
    expect(
      () => (new MembersGroup({ ...defaultProps, description: null })),
    ).toThrow(new Error('Incorrect data provided!'));
  });

  it('should cause error without customTokenName', () => {
    expect(
      () => (new MembersGroup({ ...defaultProps, customTokenName: null })),
    ).toThrow(new Error('Incorrect data provided!'));
  });

  it('should cause error without tokenName', () => {
    expect(
      () => (new MembersGroup({ ...defaultProps, tokenName: null })),
    ).toThrow(new Error('Incorrect data provided!'));
  });

  it('should cause error without list', () => {
    expect(
      () => (new MembersGroup({ ...defaultProps, list: null })),
    ).toThrow(new Error('Incorrect data provided!'));
  });
});
