# Election Voting System

## Description
 A solidity project using truffle to build a voting system.
 The project front-end is still incomplete, but the Election.sol is completed.

## Installation
1. Download Election into local directory.
   `git clone https://github.com/dangtruong01/Election`
   
2. Go to the directory and intall the required dependencies.
   'npm install'

## Execute programme
1. Deploy the smart contract:
   'truffle migrate'
   
2. Interact with the contract using Truffle console:
   'truffle console'
Eg: To initiailize the app object, run the code:
   'Election.deployed().then(function(i) {app = i;})'
Then we can call different functions of the smart contract, like:
   'app.addCandidate('Dang')'
To quit the Truffle console, press 'Ctrl' + 'D'

4. To reset the smart contract:
   'truffle migrate --reset'


