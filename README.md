# Election Voting System

## Description
 A solidity project using truffle to build a voting system.
 The project front-end is still incomplete, but the Election.sol is completed.

## Installation
1. Download Election into local directory. <br>
   `git clone https://github.com/dangtruong01/Election` <br><br>
   
2. Go to the directory and intall the required dependencies. <br>
   `npm install` <br><br>

## Execute programme
1. Deploy the smart contract: <br>
   `truffle migrate` <br><br>
2. Interact with the contract using Truffle console: <br>
   `truffle console` <br><br>
Eg: To initiailize the app object, run the code: <br>
   `Election.deployed().then(function(i) {app = i;})` <br><br>
Then we can call different functions of the smart contract, like: <br>
   `app.addCandidate('Dang')` <br><br>
To quit Truffle console, press 'Ctrl' + 'D' <br><br>
4. To reset the smart contract: <br>
   `truffle migrate --reset`


