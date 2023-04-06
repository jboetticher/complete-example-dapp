import { useState } from 'react';
import { useEthers, useContractFunction, TransactionState } from '@usedapp/core';
import { utils, Contract } from 'ethers';
import MintableERC20 from './MintableERC20.json';
import { Button, Grid, TextField, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const contractAddress = "0xeE81E9A6540ceE75496eDb37fA4393c5958783b8"; // Replace with your contract address

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const [value, setValue] = useState(0);
  const contract = new Contract(contractAddress, MintableERC20.abi);
  const { state, send } = useContractFunction(contract, 'purchaseMint', { value });

  const handlePurchaseMint = () => {
    send({ value: utils.parseEther(value.toString()) });
  };

  const handleWalletConnection = () => {
    if (account) deactivate();
    else activateBrowserWallet();
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <Box position="absolute" top={8} right={16}>
        <Button variant="contained" onClick={handleWalletConnection}>
          {account ? `Disconnect ${account.substring(0, 5) + '...'}` : 'Connect Wallet'}
        </Button>
      </Box>
      <Grid item xs={12}>
        <TextField
          type="number"
          onChange={(e) => setValue(e.target.value)}
          label="Enter value in ETH"
          variant="outlined"
          style={{ marginBottom: '16px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handlePurchaseMint} disabled={state.status == 'Mining' || account == null}>
          {state.status == 'Mining' ? <CircularProgress size={24} style={{ marginLeft: '8px' }} /> : 'Purchase Mint'}
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;
