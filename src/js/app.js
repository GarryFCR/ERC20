App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 0,
  tokensSold: 0,
  


  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
   
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');

      web3 = new Web3(App.web3Provider);
      web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
    return App.initContracts();
  },

  initContracts: function() {
  	//var contract = require("truffle-contract");
    $.getJSON("Ico.json", function(sale) {
      App.contracts.Ico = TruffleContract(sale);
      App.contracts.Ico.setProvider(App.web3Provider);
     
    }).done(function() {
      $.getJSON("Alphacointract.json", function(Token) {
        App.contracts.Alphacointract = TruffleContract(Token);
        App.contracts.Alphacointract.setProvider(App.web3Provider);
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
    if(window.ethereum){
    ethereum.enable().then(function(acc){
        App.account = acc[0];
        $("#accountAddress").html("Your Account: " + App.account);
    });
    }

    App.contracts.Ico.deployed().then(function(instance){
      ico=instance;
      return ico.tokenPrice();
    }).then(function (tokenPrice) {
      App.tokenPrice = tokenPrice;
      $('.token-price').html(web3.utils.fromWei(App.tokenPrice ,'ether'));
      return ico.tokenSold();
    }).then(function(tokensSold){
      App.tokensSold = tokensSold;
      $('.tokens-sold').html(Number(App.tokensSold));
      $('.tokens-available').html('100000000000000000000000000');
    });

    App.contracts.Alphacointract.deployed().then(function(instance){
      Instance = instance;
      return Instance.balanceOf(App.account);
    }).then(function(balance){
      $('.balance').html(String(balance));

      App.loading = false;
      loader.hide();
      content.show();      
    });
   },

   buyTokens: function () {
     $('#content').hide();
     $('#loader').show();
     var NoOfTokens = $('#NoOfToken').val();

     App.contracts.Ico.deployed().then(function(instance){
      return instance.Purchase(NoOfTokens,{
        from: App.account,
        value: NoOfTokens*App.tokenPrice,
        gas: 500000
      });
     }).then(function (result) {
      console.log("Tokens purchased");
      if(result.logs[0].event== 'Sell'){
        console.log("event triggered:", result.logs[0].event);
        App.render();
      }
      
      $('form').trigger('reset')
      
     });
   } 


}

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});