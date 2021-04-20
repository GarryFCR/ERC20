// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../contracts/erc20.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {

    Alphacointract Tok;
    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        
       Tok = new Alphacointract();
    }

    function checkSuccess() public {
        // Use 'Assert' to test the contract, 
        // See documentation: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        Assert.equal(Tok.safeAdd(1,2), 3, "Addition is wrong");
        Assert.equal(Tok.safeSub(2,2), 0, "Subtraction is wrong");
        Assert.equal(Tok.safeMul(2,2), 4, "Multiplication is wrong");
        Assert.equal(Tok.safeDiv(2,2), 1, "Division is wrong");
        Assert.notEqual(Tok.safeAdd(1,2), 4, "Addition is wrong");
        Assert.notEqual(Tok.safeSub(2,2), 1, "Subtraction is wrong");
        Assert.notEqual(Tok.safeMul(2,2), 41, "Multiplication is wrong");
        Assert.notEqual(Tok.safeDiv(2,2), 11, "Division is wrong");

        
    }

    function checkSuccess2() public pure returns (bool) {
        // Use the return value (true or false) to test the contract
        Assert.equal(Tok.totalSupply(),100000000000000000000000000,"Initialisation is incorrect");
        return true;
    }
    
    function checkFailure() public {
    }

    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-1
    /// #value: 100
    function checkSenderAndValue() public payable {
        // account index varies 0-9, value is in wei
        Assert.equal(msg.sender, TestsAccounts.getAccount(1), "Invalid sender");
        Assert.equal(msg.value, 100, "Invalid value");
    }
}

