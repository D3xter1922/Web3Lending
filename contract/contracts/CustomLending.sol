// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CustomLending is Ownable {

    uint256 public numLenders=0;

    address[] public lenders;

    mapping(address => uint256) public tokensLentAmount;
    mapping(address => uint256) public tokensBorrowedAmount;
    uint256 public totalLentAmount=0;
    uint256 totalInterest=0;
    
    struct Token {
        address tokenAddress;
        uint256 stableRate;
        string name;
    }

    IERC20 public collateralToken;
    IERC20 public lendingToken;

    uint256 public noOfTokensLent = 0;
    uint256 public noOfTokensBorrowed = 0;


    constructor(address _collateralToken, address _lendingToken) {
        collateralToken = IERC20(_collateralToken);
        lendingToken=IERC20(_lendingToken);
        
    }



    function lend(uint256 amount) external {
        require(amount > 0,"amount<0");


        require(lendingToken.balanceOf(msg.sender) >= amount,"no balance");
        if(tokensLentAmount[msg.sender]<=0){
            numLenders++;
            lenders.push(msg.sender);
        }
        lendingToken.transferFrom(msg.sender, address(this), amount);
        // lenders.push(msg.sender);
        tokensLentAmount[msg.sender] = tokensLentAmount[msg.sender]+amount;
        totalLentAmount+=amount;
        // tokensLent[noOfTokensLent++][msg.sender] = tokenAddress;
        // Send some tokens to the user equivalent to the token amount lent.
        // larToken.transfer(msg.sender, getAmountInDollars(amount, tokenAddress));

        // emit Supply(msg.sender,lenders,tokensLentAmount[tokenAddress][msg.sender]);
    }


    function creditLimit(address addr) public view returns (uint256) {
        uint256 userCollat = collateralToken.balanceOf(addr);
        return (10*userCollat/11 - tokensBorrowedAmount[addr]);
    }

    function borrow(uint256 amount) external {
        require(amount > 0);
        require(lendingToken.balanceOf(address(this)) >= amount,"Insufficient Token");
        uint256 paybackamt = amount+amount/10;
        uint256 credlim=creditLimit(msg.sender);
        require(credlim>=paybackamt, "less collateral");
        collateralToken.transferFrom(msg.sender, address(this), paybackamt);
        lendingToken.transfer(msg.sender, amount);
        tokensBorrowedAmount[msg.sender]=tokensBorrowedAmount[msg.sender]+paybackamt;
    }

    function payback() external {
        require(tokensBorrowedAmount[msg.sender]> 0, "no debt");
        uint256 p = tokensBorrowedAmount[msg.sender];
        require(lendingToken.balanceOf(msg.sender) >= p, "nononoo");
        // totalInterest+=amount/10;
        uint256 paybackamt = p;
        lendingToken.transferFrom(msg.sender, address(this), p);
        require(collateralToken.balanceOf(address(this)) >= paybackamt,"Insufficient Token");
        collateralToken.transfer(msg.sender, paybackamt);
        tokensBorrowedAmount[msg.sender]=0;
        withdraw(paybackamt);
    }

    

    function withdraw(uint256 amount) private {
        for(uint256 i=0;i<numLenders;i++){
            uint256 x = tokensLentAmount[lenders[i]];
            uint256 amt = x*amount/totalLentAmount;
            require(lendingToken.balanceOf(address(this)) >= amount,"Insufficient Tokenn");
            lendingToken.transfer(lenders[i], amt);
        }
        totalLentAmount-=10*amount/11;

    }

    


}


