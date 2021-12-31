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
import { createBudget } from "../api/budget";
import { useAppStore } from "../components/store";
import FormBox from "../components/FormBox";

export default function Budget() {
  const { store } = useAppStore();
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [amount, setAmount] = useState<string>("");

  const handleCreateBudget = async () => {
    if (date !== null) {
      await createBudget(
        parseFloat(amount),
        date.getMonth(),
        date.getFullYear(),
        "okayhere."
      );
      setCategory("");
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
      <FormBox component="form">
        <Typography variant="h2" component="div" gutterBottom>
          Add budget item
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {store.categories?.map((cat) => {
              return (
                <MenuItem key={cat.categoryId} value={cat.category}>
                  {cat.category}
                </MenuItem>
              );
            })}
            <MenuItem value="hi">hello</MenuItem>
            <MenuItem value="me">hi</MenuItem>
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
            views={["month", "year"]}
            label="Month and Year"
            minDate={new Date("2020-01-01")}
            maxDate={new Date("2030-12-31")}
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
            renderInput={(params) => (
              // eslint-disable-next-line
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <LoadingButton
          onClick={handleCreateBudget}
          endIcon={<SendIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          Create new category
        </LoadingButton>
      </FormBox>
    </Slide>
  );
}
