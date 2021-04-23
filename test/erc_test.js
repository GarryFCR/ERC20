//test
var Alphacointract = artifacts.require("Alphacointract.sol");

contract( 'Alphacointract', function(accounts){

    it('Set up the total supply upon deployment', function(){
        return Alphacointract.deployed().then(function(instance){
            tokeninstance = instance;
            return tokeninstance._totalSupply();
            }).then(function(_totalSupply){
                assert.equal(Number(_totalSupply),100000000000000000000000000,'sets the total supply');
                });
        });
    })
