import React, { useState, useEffect } from "react";
import { Typography, TextField, Slide } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAppStore } from "../components/store";
import FormBox from "../components/FormBox";
import { createTransaction } from "../api/transactions";

export default function Transaction() {
  const { store } = useAppStore();
  const [amount, setAmount] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const handleCreateTransaction = async () => {
    if (date !== null) {
      const newTransaction = await createTransaction(
        parseInt(amount, 10),
        categoryId,
        date
      );
      console.log(newTransaction);
      setAmount("");
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
          endIcon={<SendIcon />}
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
