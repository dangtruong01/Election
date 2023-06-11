// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Address
    address contractOwner;
    //Voters
    mapping(address => bool) private voters;
    //Store candidatesq
    mapping(uint => Candidate) public candidates;
    //Total number of candidates
    uint public candidatesCount;
    //Candidates Names
    string[] public candidatesNames;

    modifier onlyOwner {
        require(msg.sender == contractOwner);
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesNames.push(_name);
    }

    function getCandidatesCount() public view returns(uint) {
        return candidatesCount;
    }

    function getCandidatesNames() public view returns(string[] memory _candidateList) {
        return candidatesNames;
    }

    function getWinner() public view returns(Candidate memory) {
        Candidate memory winner;
        for (uint i = 0; i < candidatesCount; i++) {
            if (candidates[i].voteCount > winner.voteCount) {
                winner = candidates[i];
            }
        }
        return winner;
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }
}

