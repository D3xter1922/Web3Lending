// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CustomLending is Ownable {

    uint256 public numLenders=0;

    address[] public lenders;

    mapping(address => uint256) public tokensLentAmount;
    mapping(address => uint256) public tokensBorrowedAmount;
    mapping(address=>uint256) public tokensLentStart;
    mapping(address=>uint256) public tokensBorrowStart;
    mapping(address=>uint256) public tokensLentEnd;
    mapping(address=>uint256) public tokensBorrowEnd;
    uint256 public totalLentAmount=0;
    uint256 totalInterest=0;
    
    uint256 public deployTime;

    IERC20 public collateralToken;
    IERC20 public lendingToken;

    uint256 public noOfTokensLent = 0;
    uint256 public noOfTokensBorrowed = 0;
    uint256 public dailyBorrowRate = 50;
    uint256 public dailyLendRate = 10;

    constructor(address _collateralToken, address _lendingToken) {
        collateralToken = IERC20(_collateralToken);
        lendingToken=IERC20(_lendingToken);
        deployTime=block.timestamp;
    }

    
    function calculateInterest(uint256 amt, uint256 rate, uint256 duration) public pure returns(uint256){
        if(duration>8640000){
            return rate*amt;
        }
        uint256 interest = rate*duration*amt/8640000;
        return interest;
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
        tokensLentStart[msg.sender] = block.timestamp;
        totalLentAmount+=amount;
    }


    function creditLimit(address addr) public view returns (uint256) {
        uint256 userCollat = collateralToken.balanceOf(addr);
        return userCollat;
    }

    function borrow(uint256 amount) external {
        require(amount > 0);
        require(tokensBorrowedAmount[msg.sender]==0, "repay prev loans");
        require(lendingToken.balanceOf(address(this)) >= amount,"Insufficient Token");
        uint256 maxpaybackamt = amount+calculateInterest(amount, dailyBorrowRate, 86400);
        uint256 credlim=creditLimit(msg.sender);
        require(credlim>=maxpaybackamt, "less collateral");
        collateralToken.transferFrom(msg.sender, address(this), maxpaybackamt);
        lendingToken.transfer(msg.sender, amount);
        tokensBorrowedAmount[msg.sender]=amount;
        tokensBorrowStart[msg.sender]=block.timestamp;
    }

    function payback() external {
        require(tokensBorrowedAmount[msg.sender]> 0, "no debt");
        uint256 p = tokensBorrowedAmount[msg.sender];
        uint256 amt = p+calculateInterest(p, dailyBorrowRate, block.timestamp-tokensBorrowStart[msg.sender]);

        require(lendingToken.balanceOf(msg.sender) >= amt, "nononoo");
        uint256 maxpaybackamt = p+calculateInterest(p, dailyBorrowRate, 86400);
        lendingToken.transferFrom(msg.sender, address(this), amt);
        require(collateralToken.balanceOf(address(this)) >= amt,"Insufficient Token");
        collateralToken.transfer(msg.sender, maxpaybackamt);
        tokensBorrowedAmount[msg.sender]=0;
        tokensBorrowEnd[msg.sender]=block.timestamp;

        // withdraw(paybackamt);
    }

    

    function withdraw() public {

        tokensLentEnd[msg.sender] = block.timestamp;
        uint256 duration = tokensLentEnd[msg.sender] - tokensLentStart[msg.sender];
        uint256 amt = tokensLentAmount[msg.sender];
        uint256 interest = calculateInterest(amt, dailyLendRate, duration);
        require((amt+interest)>0, "low");
        lendingToken.transfer(msg.sender, amt+interest);
        totalLentAmount-=amt;
        tokensLentAmount[msg.sender]=0;
        

    }

    


}


