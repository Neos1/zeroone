pragma solidity ^0.5.15;

contract MERC20 {
  string private _name;
  string private _symbol;
  uint256 private _decimals;
  address public admin;
  address public owner;

  mapping (address => uint256) balances;
	mapping (uint => mapping (address => uint256)) userBalances;
  address[] users;

  constructor (string memory name, string memory symbol, uint256 decimals ) public {
    _name = name;
    _symbol = symbol;
    _decimals = decimals;
    admin = msg.sender;
    owner = msg.sender;
    balances[msg.sender] = _decimals;
    
    userBalances[0][msg.sender] = decimals;
    users.push(msg.sender);
  }

  function symbol() external returns(string memory) {
    return _symbol;
  }
  function name() external returns(string memory) {
    return _name;
  }
  function totalSupply() external returns(uint256) {
    return _decimals;
  }

  function getUsers() external returns (address[] memory) {
    return users;
  }

  function balanceOf(address who) external returns (uint256) {
    return balances[who];
  }

  function findUser(address user) external returns (uint) {
    uint usersLength = users.length;
		uint matched = 0;
		for (uint i = 0; i < usersLength; i++) {
			if (users[i] == user) {
				matched = i;
			}
		}
		return matched;
  }

  function findEmptyUser() external returns (uint) {
    uint usersLength = users.length;
		uint matched = 0;
		for (uint i = 0; i < usersLength; i++) {
			if (users[i] == address(0)) {
				matched = i;
			}
		}
		return matched;
  }

  function _addUser(address user, uint256 balance) external returns(uint256) {
		uint isUser = this.findUser(user);
		uint emptyIndex = this.findEmptyUser();
		if (isUser == 0) {
			balances[user] = balance;
      userBalances[emptyIndex][user] = balance;
			users[emptyIndex] = user;
		}
    return balances[user];
  }

  function transferBeetweenUsers(address sender, address recipient, uint256 amount) public returns (bool)  {
    require((msg.sender == admin) || (msg.sender == sender));
    this.transferFrom(sender, recipient, amount);
  }


  function transferFrom(address _who, address _to, uint256 value) public returns (bool) {
    require(_who != address(0), "MERC20: transfer from the zero address");
    require(_to != address(0), "MERC20: transfer to the zero address");
    require(balances[_who] >= value, "MERC20: Token value must be lower or equal");

    uint index = this.findUser(_to);
    if (index == 0 ) {
      index = users.length;
      users.push(_to);
      userBalances[index][_to] = value;
      balances[_who] = balances[_who] - value;
      balances[_to] = balances[_to] + value;
    } else {
      userBalances[index][_to] += value;
      balances[_who] = balances[_who] - value;
      balances[_to] = balances[_to] + value;
    }
    
  }

  function setAdmin(address _newAdmin) external {
    admin = _newAdmin;
  }
  
  function getAdmin() external returns (address adminitstrator) {
    return admin;
  }

}