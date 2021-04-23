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

    it('Transfer tokens',function(){
        return Alphacointract.deployed().then(function(instance){
            tokeninstance=instance;
            return tokeninstance.transfer(accounts[1],BigInt(1000000000000000000),{ from: accounts[0]});
            }).then(function(receipt){
                assert.equal(receipt.logs.length, 1, 'Triggered an event');
                assert.equal(receipt.logs[0].event,'Transfer','Transfer event');
                assert.equal(receipt.logs[0].args._from,accounts[0],'logs the sending account');
                assert.equal(receipt.logs[0].args._to,accounts[1],'logs the recieving account');
                assert.equal(receipt.logs[0].args._value,BigInt(1000000000000000000),'logs the transfer amount');
                return tokeninstance.balanceOf(accounts[0]);
            }).then(function(balance){
                assert.equal(Number(balance),100000000000000000000000000-1000000000000000000,'deducts the amount from sending account');
                return tokeninstance.balanceOf(accounts[1]);
                }).then(function(balance){
                assert.equal(Number(balance),1000000000000000000,'adds the amount to recieving account');
                return tokeninstance.transfer.call(accounts[1],BigInt(10000000000000000));
                }).then(function(success){
                assert.equal(success,true,'transfer successful')
                });
        });
                



    })
