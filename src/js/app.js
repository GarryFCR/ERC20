App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
   
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');

      web3 = new Web3(App.web3Provider);
    
    return App.initContracts();
  },

  initContracts: function() {
  	//var contract = require("truffle-contract");
    $.getJSON("Ico.json", function(sale) {
      App.contracts.Ico = TruffleContract(sale);
      App.contracts.Ico.setProvider(App.web3Provider);
      App.contracts.Ico.deployed().then(function(sale) {
        console.log("Dapp Token Sale Address:", sale.address);
      });
    }).done(function() {
      $.getJSON("Alphacointract.json", function(Token) {
        App.contracts.Alphacointract = TruffleContract(Token);
        App.contracts.Alphacointract.setProvider(App.web3Provider);
        App.contracts.Alphacointract.deployed().then(function(Token) {
          console.log("Dapp Token Address:", Token.address);
        });
        return App.render();
      });
    });
  },

  render: function() {

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
    });

   }


}

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});