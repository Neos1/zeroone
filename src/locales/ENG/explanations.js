const explanations = {
  passwordCreating: ['Password must be set in', ' English layout and contain:'],
  passwordRules: {
    numeric: 'a numeral',
    upperCase: 'a capital letter',
    symbol: 'a special character',
    length: 'minimum 6 char length',
  },
  seed: ['The phrase gives you complete control over your account', 'Be sure to write down and don’t tell it to anyone'],
  project: { name: 'The project title is set by you and appears in the project selection page', address: 'The address is provided by the creator of the project' },
  token: {
    left:
      {
        wallet: ['The contract will be uploaded to the network', ' by a wallet:'],
        balance: 'Balance: ',
        tokens: ['Tokens will be credited to this wallet', ' They can be distributed later'],
      },
    right: {
      symbol: 'A token symbol is its abbreviated name. For example: ETH, BTC, etc.',
      count: 'The total number of tokens is set by you. They can be distributed among the project participants later.',
    },
  },
};

export default explanations;
