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
import { createBudget } from "../api/budget";
import { useAppStore } from "../components/store";
import Container from "../components/Container";

export default function Budget() {
  const { store, setStore } = useAppStore();
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [amount, setAmount] = useState<string>("");

  const handleCreateBudget = async () => {
    if (date !== null) {
      const newBudgetItem = await createBudget(
        parseFloat(amount),
        date.getMonth(),
        date.getFullYear(),
        categoryId
      );
      if (
        newBudgetItem.year === new Date().getFullYear() &&
        newBudgetItem.month <= new Date().getMonth()
      )
        setStore((prevStore) => {
          prevStore.budgets.push({
            amount: newBudgetItem.amount,
            month: newBudgetItem.month,
            year: newBudgetItem.year,
            categoryId: newBudgetItem.categoryId,
            budgetId: newBudgetItem.budgetId,
          });
          return {
            ...prevStore,
            budgets: prevStore.budgets,
          };
        });
      setCategoryId("");
      setAmount("");
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
      <Container
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBudget();
        }}
      >
        <Typography variant="h2" component="div" gutterBottom>
          Add budget item
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
          type="submit"
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          Create new budget item
        </LoadingButton>
      </Container>
    </Slide>
  );
}
