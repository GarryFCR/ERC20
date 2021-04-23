//test
var Alphacointract = artifacts.require("Alphacointract.sol");

contract( 'Alphacointract', function(accounts){
    var tokeninstance;

    it('Sets the optional variables',function(){
        return Alphacointract.deployed().then(function(instance){
            tokeninstance=instance;
            return tokeninstance.name();
            }).then(function(name){
                assert.equal(name,'Alphacoin','sets the coin name');
                return tokeninstance.symbol();
                }).then(function(symbol){
                assert.equal(symbol,'ALPH','sets the symbol');
                return tokeninstance.decimals();
                }).then(function(decimal){
                assert.equal(decimal,18,'sets the decimal');
                });
        })
    it('Set up the total supply upon deployment', function(){
        return Alphacointract.deployed().then(function(instance){
            tokeninstance = instance;
            return tokeninstance._totalSupply();
            }).then(function(_totalSupply){
                assert.equal(Number(_totalSupply),100000000000000000000000000,'sets the total supply');
                });
        });
    })
