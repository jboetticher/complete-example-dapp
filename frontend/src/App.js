import { useState } from 'react';
import { useEthers, useContractFunction } from '@usedapp/core';
import { utils, Contract } from 'ethers';
import MintableERC20 from './MintableERC20.json';
import { Button, Grid, TextField, CircularProgress, Card } from '@mui/material';
import { Box } from '@mui/system';
import { PurchaseOccurredEvents } from './PurchaseOccurredEvents';
import SupplyComponent from './SupplyComponent';

const contractAddress = "0x41dC0b0B8fa9ad1Cd9d596032b71620F7c0a578b"; // Replace with your contract address

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const [value, setValue] = useState(0);
  const contract = new Contract(contractAddress, MintableERC20.abi);
  const { state, send } = useContractFunction(contract, 'purchaseMint', { value });

  // Connecting to the wallet
  const handleWalletConnection = () => {
    if (account) deactivate();
    else activateBrowserWallet();
  };

  // Mint transaction
  const handlePurchaseMint = () => send({ value: utils.parseEther(value.toString()) });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("./waves.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Box position="absolute" top={8} right={16}>
          <Button variant="contained" onClick={handleWalletConnection}>
            {account ? `Disconnect ${account.substring(0, 5) + '...'}` : 'Connect Wallet'}
          </Button>
        </Box>
        <Card sx={{ borderRadius: 4, padding: 4, maxWidth: '550px', width: '100%' }}>
          <h1 style={{ textAlign: 'center' }}>Mint Your Token!</h1>
          <SupplyComponent contract={contract} />
          <Grid item xs={12}>
            <TextField
              type="number"
              onChange={(e) => setValue(e.target.value)}
              label="Enter value in DEV"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePurchaseMint}
              disabled={state.status === 'Mining' || account == null}
            >
              {state.status === 'Mining' ? (
                <CircularProgress size={24} style={{ marginLeft: '8px' }} />
              ) : (
                'Purchase Mint'
              )}
            </Button>
          </Grid>
          <PurchaseOccurredEvents contract={contract} />
        </Card>
      </Grid>
    </Box>
  );
}

export default App;