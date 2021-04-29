App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 0,
  tokensSold: 0,
  tokensAvailable: 100000000000000000000000000,


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
    if (App.loading) {
      return;
    }
    App.loading = true;

    var loader  = $('#loader');
    var content = $('#content');

    loader.show();
    content.hide();
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
    });

    App.contracts.Ico.deployed().then(function(instance){
      ico=instance;
      return ico.tokenPrice();
    }).then(function (tokenPrice) {
      App.tokenPrice = tokenPrice;
      $('.token-price').html(web3.utils.fromWei(App.tokenPrice ,'ether'));
      return ico.tokenSold();
    }).then(function(tokensSold){
      App.tokensSold = tokensSold;
      $('.tokens-sold').html(App.tokensSold);
      $('.tokens-available').html(BigInt(App.tokensAvailable));
    })

    App.loading = false;
    loader.hide();
    content.show();

   }


}

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});