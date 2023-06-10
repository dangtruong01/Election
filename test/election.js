var Election = artifacts.require("./Election.sol");

contract ("Election", function(accounts) {
    it("initializes with two candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count,2);
        })
    });

    it("initializes candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate.id, 1, "correct id");
            assert.equal(candidate.name, "Hai Dang", "correct name");
            assert.equal(candidate.voteCount, 0, "correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate.id, 2, "correct id");
            assert.equal(candidate.name, "Tony Tan", "correct name");
            assert.equal(candidate.voteCount, 0, "correct votes count");
        })
    })

    it("allows voters to vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, {from: accounts[0]});
        }).then(function(receipt) {
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "the voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
             assert.equal(candidate.voteCount, 1, "increments the candidate's vote count");
        })
    })

    it("throws exception for invalid candidates", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.vote(99, {from: accounts[1]});
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return electionInstance.candidates(1);
        }).then(function(candidate1) {
            var voteCount = candidate1.voteCount;
            assert(voteCount, 1, "candidate 1 did not receive any votes");
            return electionInstance.candidates(2);
        }).then(function(candidate2) {
            var voteCount = candidate2.voteCount;
            assert(voteCount, 0, "candidate 2 did not receive any votes");
        })
    })

    it("throws an exception for double voting", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 2;
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(function(receipt) {
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate.voteCount;
          assert.equal(voteCount, 1, "accepts first vote");
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
            assert(error.message, 'error message must contain revert');
            return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1.voteCount;
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2.voteCount;
          assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
        });
      });


})