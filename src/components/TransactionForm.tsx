import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  deleteTransaction,
  createTransaction,
  updateTransaction,
  TransactionModel,
} from "../api/transactions";
import { TransactionInterface } from "./store";
import FormBox from "./FormBox";
import { useCategories, useTransactionsByYear } from "../api/queries";

const defaultTransaction: TransactionInterface = {
  date: new Date(),
  transactionId: "",
  amount: "",
  note: "",
  categoryId: "",
};
interface TransactionProps {
  // eslint-disable-next-line
  transactionProps?: TransactionInterface;
  // eslint-disable-next-line
  createNewTransaction?: boolean;
}

export default function TransactionForm({
  transactionProps = defaultTransaction,
  createNewTransaction = true,
}: TransactionProps) {
  const { data: categories } = useCategories();
  const { refetch: refreshTransactions } = useTransactionsByYear(
    new Date().getFullYear()
  );
  const [transaction, setTransaction] = useState<TransactionInterface>(
    transactionProps as TransactionInterface
  );
  const handleDeleteTransaction = async (transactionIdToDelete: string) => {
    deleteTransaction(transactionIdToDelete);
  };
  const handleTransaction = async (create: boolean) => {
    if (categories) {
      let newTransaction = {} as TransactionModel;
      if (create) {
        newTransaction = await createTransaction(transaction);
        refreshTransactions();
        setTransaction(defaultTransaction);
      } else {
        newTransaction = await updateTransaction(transaction);
        refreshTransactions();
        const category = categories.find(
          (c) => c.categoryId === newTransaction.categoryId
        );
        if (category) {
          const updatedTransaction: TransactionInterface = {
            date: newTransaction.date,
            amount: newTransaction.amount,
            transactionId: newTransaction.transactionId,
            note: newTransaction.note,
            categoryId: newTransaction.categoryId,
          };

          setTransaction(updatedTransaction);
        }
      }
    }
  };

  return (
    <FormBox
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleTransaction(createNewTransaction);
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={transaction.categoryId}
          label="Category"
          onChange={(e) =>
            setTransaction({
              ...transaction,
              categoryId: e.target.value,
            })
          }
          sx={{
            textAlign: "left",
          }}
        >
          {categories &&
            categories.map((c) => {
              return (
                <MenuItem key={c.categoryId} value={c.categoryId}>
                  {c.category}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <TextField
        value={transaction.amount}
        // eslint-disable-next-line
          onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
        id="outlined-number"
        label="Number"
        type="text"
      />
      <TextField
        value={transaction.note}
        // eslint-disable-next-line
          onChange={(e) => setTransaction({...transaction, note: e.target.value})}
        id="outlined-note"
        label="Note"
        type="text"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={transaction.date}
          onChange={(e) => {
            setTransaction({ ...transaction, date: e as Date });
          }}
          // eslint-disable-next-line
            renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {createNewTransaction ? (
        <Button type="submit" variant="contained">
          Submit transaction
        </Button>
      ) : (
        <Button startIcon={<EditIcon />} type="submit" variant="contained">
          Update transaction
        </Button>
      )}
      {!createNewTransaction && (
        <Button
          startIcon={<DeleteIcon />}
          sx={{ backgroundColor: "danger.main" }}
          variant="contained"
          onClick={() => handleDeleteTransaction(transaction.transactionId)}
        >
          Delete transaction
        </Button>
      )}
    </FormBox>
  );
}
