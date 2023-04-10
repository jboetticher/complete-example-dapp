import { useLogs, useBlockNumber } from '@usedapp/core';
import { utils } from 'ethers';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function PurchaseOccurredEvents({ contract }) {
  // Get block number to ensure that the useLogs doesn't search from 0, otherwise it will time out
  const blockNumber = useBlockNumber();
  const filter = { args: [null, null], contract, event: "PurchaseOccurred" };

  // NOTE: this is a workaround, it would be good to replace with an indexer
  const logs = useLogs(filter, { fromBlock: blockNumber - 10000 });
  const parsedLogs = logs?.value.slice(-5).map(log => log.data);

  return (
    <Grid item xs={12} marginTop={5}>
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Minter</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parsedLogs?.reverse().map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.minter}</TableCell>
                <TableCell align="right">{utils.formatEther(log.amount)} tokens</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
