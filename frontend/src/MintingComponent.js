import { useState } from "react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { Button, CircularProgress, TextField, Grid } from "@mui/material";
import { utils } from "ethers";

export default function MintingComponent({ contract }) {
  const [value, setValue] = useState(0);
  const { account } = useEthers();
  const { state, send } = useContractFunction(contract, 'purchaseMint', { value });

  // Mint transaction
  const handlePurchaseMint = () => send({ value: utils.parseEther(value.toString()) });

  return (
    <>
      <Grid item xs={12}>
        <TextField
          type="number"
          onChange={(e) => setValue(e.target.value)}
          label="Enter value in DEV"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '16px' }} />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained" color="primary" fullWidth
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
    </>
  );
}
