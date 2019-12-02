/* eslint-disable global-require */
/* eslint-disable no-undef */
import readSolFile from '../utils/fileUtils/index';


jest.mock('fs');


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
    '.src/contracts/libs/Questions.sol': 'file2 contents',
    '.src/contracts/libs/QuestionGroups.sol': 'file2 contents',
    '.src/contracts/libs/Votings.sol': 'file2 contents',
    '.src/contracts/libs/UserGroups.sol': 'file2 contents',
    '.src/contracts/IERC20.sol': 'IERC20 content',
  };

  const NESTING_LVL_3 = {
    '.src/contracts/Voter/Voter.sol': 'import "./VoterBase.sol";',
    '.src/contracts/Voter/VoterBase.sol': 'import "../libs/Question/Questions.sol";',
    '.src/contracts/Voter/VoterInterface.sol': 'import "../libs/Question/Questions.sol";',
    '.src/contracts/libs/Questions/Questions.sol': 'file2 contents',
  };
  const SELF_IMPORT = {
    '.src/contracts/Voter/Voter.sol': 'import "./Voter.sol";',
  };

  it('should fail on not existing file', () => {
    require('fs').__setMockFiles(FAIL_ON_QUESTIONS);
    expect(() => readSolFile('.src/contracts/Voter/Voter.sol')).toThrow();
  });

  it('should pass', () => {
    require('fs').__setMockFiles(SUCCESSFULL);
    readSolFile('.src/contracts/Voter/Voter.sol');
  });

  it('should pass with 3 levels of nesting', () => {
    require('fs').__setMockFiles(NESTING_LVL_3);
    readSolFile('.src/contracts/Voter/Voter.sol');
  });

  it('should pass with doubling files imports', () => {
    require('fs').__setMockFiles(NESTING_LVL_3);
    readSolFile('.src/contracts/Voter/Voter.sol');
  });

  it('should pass with self importing', () => {
    require('fs').__setMockFiles(SELF_IMPORT);
    readSolFile('.src/contracts/Voter/Voter.sol');
  });
});
