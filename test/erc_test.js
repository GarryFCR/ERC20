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

    it('Approves transfer of tokens on your behalf',function(){
        return Alphacointract.deployed().then(function(instance){
            tokeninstance=instance;
            return tokeninstance.approve(accounts[1],BigInt(1000000000000000000),{from:accounts[0]});
            }).then(function(receipt){
                assert.equal(receipt.logs.length, 1, 'Triggered an event');
                assert.equal(receipt.logs[0].event,'Approval','Approval event');
                assert.equal(receipt.logs[0].args._owner,accounts[0],'logs the account that is approving');
                assert.equal(receipt.logs[0].args._spender,accounts[1],'logs the account approved');
                assert.equal(receipt.logs[0].args._value,BigInt(1000000000000000000),'logs the transfer amount');
                return tokeninstance.allowance(accounts[0],accounts[1]);
            }).then(function(allowed){
                assert.equal(Number(allowed),BigInt(1000000000000000000),'Stores the allowance');
                return tokeninstance.approve.call(accounts[1],BigInt(1000000000000000000),{from:accounts[0]});                
            }).then(function(success){
                assert.equal(success,true,'returns true');
                });
                
        });

    it('Take care of approved transfer', function(){
        return Alphacointract.deployed().then(function(instance){
            tokeninstance=instance;
            return tokeninstance.transfer(accounts[2],BigInt(10000000000000000000),{from:accounts[0]});
            }).then(function(){
                return tokeninstance.approve(accounts[3],BigInt(10000000000000000000),{from:accounts[2]});
            }).then(function(){
                return tokeninstance.transferFrom.call(accounts[2],accounts[4],BigInt(5000000000000000000),{from:accounts[3]});
            }).then(function(success){
                assert.equal(success,true);
                return tokeninstance.transferFrom(accounts[2],accounts[4],BigInt(5000000000000000000),{from:accounts[3]});
            }).then(function(receipt){
                assert.equal(receipt.logs.length, 1, 'Triggered an event');
                assert.equal(receipt.logs[0].event,'Transfer','Transfer event');
                assert.equal(receipt.logs[0].args._from,accounts[2],'logs the  account sending from');
                assert.equal(receipt.logs[0].args._to,accounts[4],'logs the recieving account');
                assert.equal(receipt.logs[0].args._value,BigInt(5000000000000000000),'logs the transfer amount');
                return tokeninstance.balanceOf(accounts[2]);
            }).then(function(balance) {
                assert.equal(Number(balance),BigInt(5000000000000000000), 'deducts the amount from the sending account');
                return tokeninstance.balanceOf(accounts[4]);
            }).then(function(balance) {
                assert.equal(Number(balance), BigInt(5000000000000000000), 'adds the amount from the receiving account');
                return tokeninstance.allowance(accounts[2],accounts[3]);
            }).then(function(allowance) {
                assert.equal(Number(allowance),BigInt(5000000000000000000), 'deducts the amount from the allowance');
            });
        });

    it('Takes care of safe math operations',function(){
        return Alphacointract.deployed().then(function(instance){
            Mathinstance=instance;
            return Mathinstance.safeAdd(10,5);
            }).then(function(sum){
                assert(sum>=10+5);                
                assert.equal(sum,15,'Adds correctly');
                return Mathinstance.safeSub(5,10);
            }).then(assert.fail).catch(function(error){
                assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
                return Mathinstance.safeSub(10,5);
                }).then(function(sub){
                assert(sub<10);                
                assert.equal(sub,5,'subtracts correctly');
            });

    });

})
        

        
    
