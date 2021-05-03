var Ico= artifacts.require('./Ico.sol');
var Alphacointract = artifacts.require('./Alphacointract.sol');

contract('Ico', function(accounts) {
  var Instance;
  var IcoInstance;
  var admin = accounts[0];
  

  it('Sets up the intial values', function() {
    return Ico.deployed().then(function(instance) {
      Instance = instance;
      return Instance.address
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'Ico contract instantiated');
      return Instance.token();
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'Alphacointract instantiated');
      return Instance.tokenPrice();
    }).then(function(price) {
      assert.equal(price, 100000000000000, 'token price intialised');
    });
  })


it('Purchases tokens', function() {
    return Alphacointract.deployed().then(function(instance) {
      Instance = instance;
      return Ico.deployed();
    }).then(function(instance) {
      IcoInstance = instance;
      return Instance.transfer(IcoInstance.address, BigInt(50000000000000000), { from: admin })
    }).then(function(receipt) {
      return IcoInstance.Purchase(50, { from: accounts[1], value: 50 * 100000000000000 })
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, 'Triggered an event');
      assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
      assert.equal(receipt.logs[0].args.buyer, accounts[1], 'logs the buying account');
      assert.equal(receipt.logs[0].args._amount, 50, 'logs the number of tokens purchased');
      return IcoInstance.tokenSold();
    }).then(function(sold) {
      assert.equal(Number(sold), 50, 'increments the number of tokens sold');
      return Instance.balanceOf(accounts[1]);
    }).then(function(balance) {
      assert.equal(Number(balance),50);
      return Instance.balanceOf(IcoInstance.address);
    }).then(function(balance) {
      assert.equal(Number(balance),  50000000000000000- 50);
      return IcoInstance.Purchase(500, { from: accounts[1], value: 1 });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
      return IcoInstance.Purchase(800000, { from: accounts[1], value: 50 * 100000000000000 })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
    });
  });


  it('ends the ICO', function() {
    return Alphacointract.deployed().then(function(instance) {
      Instance = instance;
      return Ico.deployed();
    }).then(function(instance) {
      IcoInstance = instance;
      return IcoInstance.endSale({ from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
      IcoInstance.end({ from: admin });
      return Instance.balanceOf(admin);
    }).then(function(balance) {
      assert.equal(Number(balance), BigInt(100000000000000000000000000-50), 'returns unsold tokens to admin');
      return Instance.balanceOf(IcoInstance.address);
    }).then(function(balance){
      assert.equal(Number(balance), 0);
    })
    });
  










})
