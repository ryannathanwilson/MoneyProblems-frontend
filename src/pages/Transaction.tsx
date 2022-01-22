import React, { useState } from "react";
import { Typography, TextField, Slide } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAppStore, CategoryInterface } from "../components/store";
import FormBox from "../components/FormBox";
import { createTransaction } from "../api/transactions";

export default function Transaction() {
  const { store, setStore } = useAppStore();
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const handleCreateTransaction = async () => {
    if (date !== null) {
      const newTransaction = await createTransaction(
        parseFloat(amount),
        categoryId,
        note,
        date
      );
      const category = store.categories.find(
        (cat: CategoryInterface) => cat.categoryId === newTransaction.categoryId
      ) as CategoryInterface;
      setStore((prevState) => {
        prevState.transactions.push({
          transactionId: newTransaction.transactionId,
          amount: parseFloat(newTransaction.amount),
          category,
          note: newTransaction.note,
          date: new Date(newTransaction.date),
        });
        return {
          ...prevState,
          transactions: prevState.transactions,
        };
      });
      setAmount("");
      setCategoryId("");
      setDate(new Date());
    }
  };

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <FormBox
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTransaction();
        }}
      >
        <Typography variant="h2" component="div" gutterBottom>
          Add expense
        </Typography>
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
          Submit transaction
        </LoadingButton>
      </FormBox>
    </Slide>
  );
}
