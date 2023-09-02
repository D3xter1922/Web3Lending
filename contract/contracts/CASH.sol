// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CASH is ERC20{
    constructor() ERC20("CASH Token", "CASH"){
        _mint(msg.sender, 10000000 * 10**18);
    }


}
