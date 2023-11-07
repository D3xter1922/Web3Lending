import React, {useState, useEffect} from 'react';
import {ethers} from "ethers";


function App() {

  const CASH_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const GOLD_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const CustomLending_ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "borrow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "lend",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payback",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_lendingToken",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "calculateInterest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "collateralToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "creditLimit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dailyBorrowRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dailyLendRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "lenders",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lendingToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "noOfTokensBorrowed",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "noOfTokensLent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numLenders",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokensBorrowedAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokensBorrowEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokensBorrowStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokensLentAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokensLentEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokensLentStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalLentAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const FreeTokens_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_one",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_two",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "GetFreeTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "collateralToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lendingToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const cashAddr = '0x6B823C0a0F8Cb7D2B9d1D26dE29d569ff2a39E87';
  // const cashAddr = '0x287EB827874B192c7Fe040EBE2B6C6d50d1FbFd8';
  const goldAddr = '0xc10A00531A88A9681b4776b7c6ada2151C860CeD';
  const lendingAddr = '0xD4Cd450eAB94d497D0688D37952C6AA6b2B52004';
  const freeTokenAddr = '0x8d4C8D48675C5E4B78753Fa49378ee988A4791E4';
  // let CASH_contract;
  // let GOLD_contract;
  // let CustomLending_contract;


  const [state, setState] = useState({
    provider: null,
    signer: null,
    cashContract: null,
    goldContract: null,
    lendingContract: null,
    freeTokensContract: null,
  });
  const [account, setAccount]=useState("None");
  const [lendingamt, setLendingamt] = useState(0);
  const [borrowamt, setBorrowamt] = useState(0);
  const [returnamt, setReturnamt] = useState(0);
  const [liquidity, setLiquidity] = useState('');
  const [lentAmount, setLentAmount] = useState('');
  const [contractBalance, setContractBalance] = useState(0);
  const [userBalance, setUserBalance] = useState('');
  const [IO, setIO] = useState();
  const [gold, setGold] = useState();
  const [cash, setCash] = useState();
  const [transferAddress, setTransferAddress] = useState();
  const [isLoading, setIsLoading] = useState(0);
  

  const handleLendingAmtChange = (e)=>{
    setLendingamt(e.target.value);
  }
  const handleBorrowAmtChange = (e)=>{
    setBorrowamt(e.target.value);
  }
  const handleReturnAmtChange = (e)=>{
    setReturnamt(e.target.value);
  }
  const handleTransferAddressChange = (e)=>{
    setTransferAddress(e.target.value);
  }
  
  const handleLendingSubmit = async(e)=>{
    e.preventDefault();
    
    const {cashContract, lendingContract} = state;
    // const newValue = BigInt(20 * 10 ** 18);
    // console.log(newValue);
    console.log(cashContract);
    setIsLoading(1);
    try{
      const tx = await cashContract.approve(lendingAddr, (ethers.utils.parseEther(lendingamt.toString()).toString()));
    // alert(tx);
      await tx.wait();
      console.log("done");

      const tx2 = await lendingContract.lend((ethers.utils.parseEther(lendingamt.toString()).toString()));
      await tx2.wait();
      setLiquidity(0);
    }catch(err){
      setIsLoading(0);
      alert(err);
    }
    setIsLoading(0);
    
    // alert(tx);
    // console.log(tx);
    
  }

  const handleBorrowSubmit = async(e)=>{
    e.preventDefault();
    const {cashContract, goldContract, lendingContract} = state;
    // const newValue = BigInt(20 * 10 ** 18);
    // console.log(newValue);
    // console.log(cashContract);
    console.log(ethers.utils.parseEther((3*borrowamt/2).toString()));
    setIsLoading(1);
    try{
      const tx1 = await goldContract.approve(lendingAddr, ethers.utils.parseEther((3*borrowamt/2).toString()));
    // alert(tx);
      await tx1.wait();
      
      const tx = await lendingContract.borrow(ethers.utils.parseEther(borrowamt.toString()).toString());
      // alert(tx);
      await tx.wait();
      // alert(tx);
      // console.log(tx);
      console.log("done");
      setIO(0);
    }catch(err){
      setIsLoading(0);
      alert(err);
    }
    setIsLoading(0);

    

    
    // const tx2 = await lendingContract.lend(((ethers.BigNumber.from(lendingamt))*10**18).toString());
    // await tx2.wait();
  }
  const handleReturnSubmit = async(e)=>{
    e.preventDefault();
    const {cashContract, lendingContract} = state;
    console.log(ethers.utils.parseEther(borrowamt.toString()).toString());
    setIsLoading(1);
    try{
      const tx = await cashContract.approve(lendingAddr, (ethers.utils.parseEther((3*IO/2).toString()).toString()));
      await tx.wait();
      const tx2 = await lendingContract.payback ();
      await tx2.wait();
      console.log("done");
      setIO(0);
    }catch(err){
      setIsLoading(0);
      alert(err);
    }
    setIsLoading(0);



  }

  const handleGetFreeTokens = async (e)=>{
    e.preventDefault();
    const {freeTokensContract} = state;
    setIsLoading(1);
    try{
      const tx = await freeTokensContract.GetFreeTokens();
      await tx.wait();
      setIO(0);
    }catch(err){
      setIsLoading(0);
      alert(err);
    }
    setIsLoading(0);

  }
  const handleWithdraw = async (e)=>{
    e.preventDefault();
    const {lendingContract} = state;
    setIsLoading(1);
    try{
      const tx = await lendingContract.withdraw();
      await tx.wait();
      setIO(0);
    }catch(err){
      setIsLoading(0);
      alert(err);
    }
    setIsLoading(0);

  }

  useEffect(()=>{
    const connectWallet = async ()=>{

      try {
        const {ethereum} = window;

        if(ethereum){
          const account = await ethereum.request({method: "eth_requestAccounts"});
          
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const cashContract = new ethers.Contract(cashAddr, CASH_ABI, signer);
          const goldContract = new ethers.Contract(goldAddr, GOLD_ABI, signer);
          const lendingContract = new ethers.Contract(lendingAddr, CustomLending_ABI, signer);
          const freeTokensContract = new ethers.Contract(freeTokenAddr, FreeTokens_ABI, signer);
          setAccount(account);
          setState({provider, signer, cashContract, goldContract, lendingContract, freeTokensContract});
          
        }
      } catch(err){
        console.log(err);
      }
    }

    
    connectWallet();
    
    
    // getTotalSupply()
    //   .catch(console.error);
    

    
  },[]);
  
  useEffect(()=>{
    const findLiquidity = async ()=>{
      const {cashContract} = state;
      if(cashContract!=null){
        const tx = await cashContract.balanceOf(lendingAddr);
      // alert(tx);
        // await tx.wait();
        const n = ethers.utils.formatEther(tx);
        console.log(ethers.utils.formatEther(tx));
        setLiquidity(n.toString());
        }
    }
    const findLentAmount = async ()=>{
      const {lendingContract, signer} = state;
      if(lendingContract!=null){
        const addres = await signer.getAddress();
        const tx = await lendingContract.tokensLentAmount(addres);
        const n = ethers.utils.formatEther(tx);
        setLentAmount(n.toString());
      }

    }
    const findGold = async ()=>{
      const {goldContract, signer} = state;
      if(goldContract!=null){

        const addres = await signer.getAddress();
      const tx = await goldContract.balanceOf(addres);
    // alert(tx);
      // await tx.wait();
      const n = ethers.utils.formatEther(tx);
      console.log(ethers.utils.formatEther(tx));
      setGold(n.toString());
      }
    }
    const findCash = async ()=>{
      const {cashContract,  signer} = state;
      if(cashContract!=null){

        const addres = await signer.getAddress();
      const tx = await cashContract.balanceOf(addres);
    // alert(tx);
      // await tx.wait();
      const n = ethers.utils.formatEther(tx);
      console.log(ethers.utils.formatEther(tx));
      setCash(n.toString());
      }
    }
    
    const findIO = async ()=>{
      const {lendingContract, signer} = state;
      if(lendingContract!=null){
        const addres = await signer.getAddress();
      const tx = await lendingContract.tokensBorrowedAmount(addres);
    // alert(tx);
      // await tx.wait();
      const n = ethers.utils.formatEther(tx);
      console.log(ethers.utils.formatEther(tx));
      setIO(n.toString());
      }
    }
    findLiquidity();
    findIO();
    findCash();
    findGold();
    findLentAmount(); 
  }, )
  




  return (
    <div>
      
        <div className="container">
    <div className="container text-center">
       <div className="row">
         <div className="col">
           <h1>lending demo</h1>
          <h3>Demo created by members of group D for the course Blockchain applications in finance</h3>
         </div>
       </div>
       <div className="row">
         <div className="col">
           <h1>Info and cheats</h1>
           <p>Asset Balance: {gold}</p>
           <p>Cash Balance: {cash}</p>
           <p>Amount Lent: {lentAmount}</p>
           <form>
           
             <button type="submit" className="btn btn-primary" onClick={handleGetFreeTokens} >Gert epic free virtual internet points (testing tokens)</button>
           </form>
         </div>
       </div>
       {isLoading ? (
        <div>
        <div class="d-flex justify-content-center">
        <div class="spinner-border"  style={{width: "3rem", height: "3rem"}} role="status">
          <span class="visually-hidden">Loading...</span>
          
        </div>
        
      </div>
      <div>Waiting for transaction....</div></div>
      ):(
       <div className="row">
         <div className="col">
           <form>
             <div className="mb-3">
               <div class="container text-center">
                 <div class="row align-items-start">
                   <div class="col">
                     <p>lending pool: {liquidity}</p>
                   </div>
                 </div>
               </div>
             
               <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleLendingAmtChange} />
             </div>
             <div class="container text-center">
 <div class="row align-items-center">
   <div class="col">
   <button type="submit" className="btn btn-primary" onClick={handleLendingSubmit} >Lend</button>
   </div>
   <div class="col">
   <button type="submit" className="btn btn-primary" onClick={handleWithdraw}>Withdraw</button>
   </div>
 </div>
</div>
           </form>
           
         </div>
         <div className="col">
           <div className="container text-center">
             <div className="row">
               <form onSubmit={handleBorrowSubmit}>
                 <div className="mb-3">
                   <div class="container text-center">
                     <div class="row align-items-start">
                       <div class="col">
                         <p>You owe: {IO}</p>
                       </div>
                     </div>
                   </div>
                   <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleBorrowAmtChange} />
                 </div>
               </form>
             </div>
           <div className="row">
         
           <div class="container text-center">
 <div class="row align-items-center">
   <div class="col">
   <button type="submit" className="btn btn-primary" onClick={handleBorrowSubmit}>Borrow</button>
   </div>
   <div class="col">
   <button type="submit" className="btn btn-primary" onClick={handleReturnSubmit}>Payback</button>
   </div>
 </div>
</div>
           
         </div>
         </div>
         
         </div>
       </div>
       )}
     </div>
        </div>
      
      
   </div>
    
    
  );
}

export default App;
