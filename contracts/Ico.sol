//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import "./Alphacointract.sol";


contract Ico {
	address admin;
	Alphacointract public token;
	uint256 public tokenPrice;
	uint256 public tokenSold;

	event Sell(address buyer,uint256 _amount);

  	constructor(Alphacointract _token) public {
  		admin = msg.sender;
  		token = _token;
  		tokenPrice = 100000000000000; //in wei (0.0001 eth)    
  }

  function Purchase(uint256 _NoOfTokens) public payable{
  	require(msg.value ==  token.safeMul(_NoOfTokens,tokenPrice));
  	require(token.balanceOf(address(this)) >= _NoOfTokens);
  	require (token.transfer(msg.sender,_NoOfTokens));
  	
  	tokenSold += _NoOfTokens;

  	emit Sell(msg.sender,_NoOfTokens);

  }

  function end() public{
  	require(msg.sender == admin);
  	require (token.transfer(admin,token.balanceOf(address(this))));

  	selfdestruct(msg.sender);
  }
}
