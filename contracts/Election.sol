// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Voters
    mapping(address => bool) public voters;
    //Store candidates
    mapping(uint => Candidate) public candidates;
    //Total number of candidates
    uint public candidatesCount;

    constructor() {
        addCandidate("Hai Dang");
        addCandidate("Tony Tan");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }
}

