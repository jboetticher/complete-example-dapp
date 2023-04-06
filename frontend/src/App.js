import { useState } from 'react';
import { useEthers, useContractFunction } from '@usedapp/core';
import { utils, Contract } from 'ethers';
import MintableERC20 from '../artifacts/contracts/MintableERC20.sol/MintableERC20.json';

const contractAddress = "0xYourContractAddress"; // Replace with your contract address

function App() {
  const { activateBrowserWallet, account } = useEthers();
  const [value, setValue] = useState(0);
  const contract = new Contract(contractAddress, MintableERC20.abi);
  const { state, send } = useContractFunction(contract, 'purchaseMint', { value });

  const handlePurchaseMint = () => {
    send({ value: utils.parseEther(value.toString()) });
  };

  return (
    <div>
      <button onClick={() => activateBrowserWallet()}>
        Connect Wallet
      </button>
      <div>
        <input
          type="number"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value in ETH"
        />
        <button onClick={handlePurchaseMint}>
          Purchase Mint
        </button>
      </div>
    </div>
  );
}

export default App;
