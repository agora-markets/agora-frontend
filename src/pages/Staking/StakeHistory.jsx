import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './styles.module.scss'

function createData(id, rarity, dateEnded) {
  return { id, rarity, dateEnded };
}
function NFTId(propss) {
  // const {id} = props
  return (
    <div className={styles.tableId} >
      <img src="/02.jpg" alt="" />
      <div>
        <strong>{propss}</strong>
        <span>Horror Squad(1)</span>
      </div>
    </div>
  );
}
const rows = [
  createData(NFTId(123), 159, "23/23/23"),
  createData(NFTId(123), 159, 6.0),
  createData(NFTId(123), 159, 6.0),
  createData(NFTId(123), 159, 6.0),
];
const StakeHistory = () => {
  return (
    <div id={styles.history}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NFT Id</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date Ended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.rarity}</TableCell>
                <TableCell align="right">{row.dateEnded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StakeHistory;
