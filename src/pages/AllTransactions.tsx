import React from "react";
import { Typography, Slide, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppStore } from "../components/store";
import FormBox from "../components/FormBox";
// import { deleteTransaction } from "../api/transactions";

export default function AllTransactions() {
  const { store } = useAppStore();
  // const handleOpenModal = (transaction: any) => {
  // console.log(transaction);
  // };
  // const handleUpdateTransaction = async () => {
  // const updatedTransaction = await
  // }
  // const handleDeleteTransaction = async (transactionId: string) => {
  // deleteTransaction(transactionId);
  // const updatedTransactionList = store.transactions.filter(
  // (transaction) => transaction.transactionId !== transactionId
  // );
  // setStore({
  // ...store,
  // transactions: updatedTransactionList,
  // });
  // };

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <FormBox component="form">
        <Typography variant="h2" component="div" gutterBottom>
          Transactions
        </Typography>
        <TableContainer component={Paper} elevation={4}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.transactions &&
                store.transactions.map((row) => {
                  const date = new Date(row.date).toLocaleString("en-US", {
                    dateStyle: "medium",
                  });
                  return (
                    <TableRow
                      key={row.transactionId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {date}
                      </TableCell>
                      <TableCell align="left">
                        {row.category.category}
                      </TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="edit"
                          // onClick={() => handleOpenModal(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          // onClick={() =>
                          // handleDeleteTransaction(row.transactionId)
                          // }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </FormBox>
    </Slide>
  );
}
