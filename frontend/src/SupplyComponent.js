import { useCall } from "@usedapp/core";
import { utils } from "ethers";
import { Grid } from "@mui/material";

export default function SupplyComponent({ contract }) {
  const totalSupply = useCall({ contract, method: 'totalSupply', args: [] });
  const maxSupply = useCall({ contract, method: 'MAX_TO_MINT', args: [] });
  const totalSupplyFormatted = totalSupply ? utils.formatEther(totalSupply.value.toString()) : '...';
  const maxSupplyFormatted = maxSupply ? utils.formatEther(maxSupply.value.toString()) : '...';

  return (
    <Grid item xs={12}>
      <h3 style={{ textAlign: 'center' }}>
        Total Supply: {totalSupplyFormatted} / {maxSupplyFormatted}
      </h3>
    </Grid>
  );
}