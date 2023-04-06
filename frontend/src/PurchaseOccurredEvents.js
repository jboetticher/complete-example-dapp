import { useLogs, useBlockNumber } from '@usedapp/core';
import { utils } from 'ethers';
import { Grid } from '@mui/material';

export function PurchaseOccurredEvents({ contract }) {
  // Get block number to ensure that the useLogs doesn't search from 0, otherwise it will time out
  const blockNumber = useBlockNumber();
  const filter = { args: [null, null], contract, event: "PurchaseOccurred" };

  // NOTE: this is a workaround, it would be good to replace with an indexer
  const logs = useLogs(filter, { fromBlock: blockNumber - 10000 });
  const parsedLogs = logs?.value.slice(-5).map(log => log.data);

  console.log("logs", logs);

  return (
    <Grid item xs={12}>
      <h2>Recent PurchaseOccurred events:</h2>
      <ul>
        {parsedLogs?.map((log, index) => (
          <li key={index}>
            Minter: {log.minter}, Amount: {utils.formatEther(log.amount)} tokens
          </li>
        ))}
      </ul>
    </Grid>
  );
}
