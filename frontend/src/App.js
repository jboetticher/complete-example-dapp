import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import MintableERC20 from './MintableERC20.json';
import { Button, Grid, Card } from '@mui/material';
import { Box } from '@mui/system';
import PurchaseOccurredEvents from './PurchaseOccurredEvents';
import SupplyComponent from './SupplyComponent';
import MintingComponent from './MintingComponent';

const contractAddress = "0x41dC0b0B8fa9ad1Cd9d596032b71620F7c0a578b"; // Replace with your contract address

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const contract = new Contract(contractAddress, MintableERC20.abi);

  // Connecting to the wallet
  const handleWalletConnection = () => {
    if (account) deactivate();
    else activateBrowserWallet();
  };

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
          <MintingComponent contract={contract} />
          <PurchaseOccurredEvents contract={contract} />
        </Card>
      </Grid>
    </Box>
  );
}

export default App;

