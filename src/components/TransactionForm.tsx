import React, { useState } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAppStore, CategoryInterface, TransactionInterface } from "./store";
import FormBox from "./FormBox";
import {
  createTransaction,
  updateTransaction,
  TransactionModel,
} from "../api/transactions";

const defaultTransaction: TransactionInterface = {
  date: new Date(),
  transactionId: "",
  note: "",
  category: {
    category: "",
    categoryId: "",
  },
};
interface TransactionProps {
  // eslint-disable-next-line
  transaction?: TransactionInterface;
  // eslint-disable-next-line
  createNewTransaction?: boolean;
}

export default function TransactionForm({
  transaction = defaultTransaction,
  createNewTransaction = true,
}: TransactionProps) {
  const { store, setStore } = useAppStore();
  const [transactionId] = useState<string>(transaction?.transactionId);
  const [amount, setAmount] = useState<string>(
    transaction?.amount ? transaction?.amount.toString() : ""
  );
  const [note, setNote] = useState<string>(transaction?.note || "");
  const [categoryId, setCategoryId] = useState<string>(
    transaction.category.categoryId
  );
  const [date, setDate] = useState<Date | null>(transaction.date);
  const handleTransaction = async (create: boolean) => {
    if (date !== null) {
      let newTransaction = {} as TransactionModel;
      if (create) {
        newTransaction = await createTransaction(
          parseFloat(amount),
          categoryId,
          note,
          date
        );
      } else {
        newTransaction = await updateTransaction(
          transactionId,
          parseFloat(amount),
          categoryId,
          note,
          date
        );
      }
      const category = store.categories.find(
        (cat: CategoryInterface) => cat.categoryId === newTransaction.categoryId
      ) as CategoryInterface;
      setStore((prevState) => {
        const transactionToStore = {
          transactionId: newTransaction.transactionId,
          amount: parseFloat(newTransaction.amount),
          category,
          note: newTransaction.note,
          date: new Date(newTransaction.date),
        };
        const transactionsArray = prevState.transactions;
        if (create) {
          transactionsArray.push(transactionToStore);
        } else {
          const index = transactionsArray.findIndex(
            (t) => t.transactionId === newTransaction.transactionId
          );
          transactionsArray[index] = transactionToStore;
        }
        return {
          ...prevState,
          transactions: transactionsArray,
        };
      });
      setAmount("");
      setCategoryId("");
      setDate(new Date());
      setNote("");
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
          value={categoryId}
          label="Category"
          onChange={(e) => setCategoryId(e.target.value)}
          sx={{
            textAlign: "left",
          }}
        >
          {store.categories.map((cat) => {
            return (
              <MenuItem key={cat.categoryId} value={cat.categoryId}>
                {cat.category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        value={amount}
        // eslint-disable-next-line
          onChange={(e) => setAmount(e.target.value)}
        id="outlined-number"
        label="Number"
        type="number"
      />
      <TextField
        value={note}
        // eslint-disable-next-line
          onChange={(e) => setNote(e.target.value)}
        id="outlined-note"
        label="Note"
        type="text"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(e) => {
            setDate(e);
          }}
          // eslint-disable-next-line
            renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LoadingButton
        type="submit"
        loading={false}
        loadingPosition="end"
        variant="contained"
      >
        {createNewTransaction ? "Submit transaction" : "Update transaction"}
      </LoadingButton>
    </FormBox>
  );
}
