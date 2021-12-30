import React, { useEffect, useState } from "react";
import { Typography, TextField, Slide } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormBox from "../components/FormBox";
import { useAppStore } from "../components/store";

export default function Transaction() {
  const { store } = useAppStore();
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [delayedAppear, setDelayedApear] = useState<boolean>(false);
  const handleCreateTransaction = async () => {
    console.log("working");
  };
  useEffect(() => {
    if (store.loggedIn) {
      setTimeout(() => setDelayedApear(true), 300);
    }
  }, [store.loggedIn]);

  return (
    <Slide
      direction="up"
      timeout={300}
      in={delayedAppear}
      mountOnEnter
      unmountOnExit
    >
      <FormBox component="form">
        <Typography variant="h1" component="div" gutterBottom>
          Add expense
        </Typography>
        <TextField
          value={category}
          // eslint-disable-next-line
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        />
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
          onClick={handleCreateTransaction}
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
