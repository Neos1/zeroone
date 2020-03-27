pragma solidity ^0.5.15;

interface ExternalContract {
  function applyVotingData(uint votingId, uint questionId, bytes calldata data) external returns (bool);
}