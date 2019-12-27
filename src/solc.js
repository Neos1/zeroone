const solc = require('solc');
const fs = require('fs');


const contract = fs.readFileSync(`${__dirname}/contracts/contractsdfdsf.sol`, 'utf8');


/**
 * @param name
 * @param content
 */

function compileAndReturn(name, content) {
  const output = solc.compile(content);
  return output.contracts[`:${name}`];
}

const output = compileAndReturn('Voter', contract);


fs.writeFileSync(`${__dirname}/test.json`, JSON.stringify(output, null, '\t'));
