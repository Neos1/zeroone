import readSolFile from '../utils/fileUtils/index';

jest.mock('fs');
const fs = require('fs');

describe('readFile', () => {
  const FAIL_ON_QUESTIONS = {
    '.src/contracts/Voter/Voter.sol': 'import "./VoterBase.sol";',
    '.src/contracts/Voter/VoterBase.sol': 'import "../libs/QuestionGroups.sol"; import "../libs/UserGroups.sol"; import "../libs/Questions.sol"; import "../libs/Votings.sol"; import "./VoterInterface.sol"; import "../IERC20.sol";',
    '.src/contracts/Voter/VoterInterface.sol': 'import "../libs/QuestionGroups.sol"; import "../libs/Questions.sol"; import "../libs/Votings.sol"; import "../libs/UserGroups.sol";',
  };

  const SUCCESSFULL = {
    '.src/contracts/Voter/Voter.sol': 'import "./VoterBase.sol";',
    '.src/contracts/Voter/VoterBase.sol': 'import "../libs/QuestionGroups.sol"; import "../libs/UserGroups.sol"; import "../libs/Questions.sol"; import "../libs/Votings.sol"; import "./VoterInterface.sol"; import "../IERC20.sol";',
    '.src/contracts/Voter/VoterInterface.sol': 'import "../libs/QuestionGroups.sol"; import "../libs/Questions.sol"; import "../libs/Votings.sol"; import "../libs/UserGroups.sol";',
    '.src/contracts/libs/Questions.sol': 'file1 contents',
    '.src/contracts/libs/QuestionGroups.sol': 'file2 contents',
    '.src/contracts/libs/Votings.sol': 'file3 contents',
    '.src/contracts/libs/UserGroups.sol': 'file4 contents',
    '.src/contracts/IERC20.sol': 'IERC20 content',
  };


  const NESTING_LVL_3 = {
    '.src/contracts/Voter/Voter.sol': 'import "./VoterBase/VoterBase.sol";',
    '.src/contracts/Voter/VoterBase/VoterBase.sol': 'test123',
  };
  const SELF_IMPORT = {
    '.src/contracts/Voter/Voter.sol': 'import "./Voter.sol";',
  };

  it('should fail on not existing file', () => {
    fs.__setMockFiles(FAIL_ON_QUESTIONS);
    expect(() => readSolFile('.src/contracts/Voter/Voter.sol')).toThrow();
  });

  it('should pass', () => {
    fs.__setMockFiles(SUCCESSFULL);
    const output = readSolFile('.src/contracts/Voter/Voter.sol');
    expect(output).toBe('file2 contents file4 contents file1 contents file3 contents     IERC20 content');
  });

  it('should pass with doubling files imports', () => {
    fs.__setMockFiles(SUCCESSFULL);
    const output = readSolFile('.src/contracts/Voter/Voter.sol');
    expect(output).toBe('file2 contents file4 contents file1 contents file3 contents     IERC20 content');
  });

  it('should pass with 3 levels of nesting', () => {
    fs.__setMockFiles(NESTING_LVL_3);
    const output = readSolFile('.src/contracts/Voter/Voter.sol');
    expect(output).toBe('test123');
  });

  it('should pass with self importing', () => {
    fs.__setMockFiles(SELF_IMPORT);
    const output = readSolFile('.src/contracts/Voter/Voter.sol');
    expect(output).toBe('');
  });
});
