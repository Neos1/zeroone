pragma solidity ^0.5;

interface ExternalContract {
  function applyVotingData(uint votingId, uint questionId, bytes data) external returns (bool);
}