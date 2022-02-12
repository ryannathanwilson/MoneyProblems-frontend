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
import { BudgetInterface } from "./store";
import {
  deleteBudget,
  createBudget,
  updateBudget,
  BudgetModel,
} from "../api/budget";
import FormBox from "./FormBox";
import {
  useBudgetByMonth,
  useCategories,
  useTransactionsByYear,
} from "../api/queries";

const defaultBudget: BudgetInterface = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  amount: "",
  categoryId: "",
  budgetId: "",
};
interface BudgetProps {
  // eslint-disable-next-line
  budgetProps?: BudgetInterface;
  // eslint-disable-next-line
  createNewBudget?: boolean;
}

export default function BudgetForm({
  budgetProps = defaultBudget,
  createNewBudget = true,
}: BudgetProps) {
  const { data: categories } = useCategories();
  const { refetch: refreshBudget } = useBudgetByMonth(
    new Date().getMonth(),
    new Date().getFullYear()
  );
  const [budget, setBudget] = useState<BudgetInterface>(
    budgetProps as BudgetInterface
  );

  const handleDeleteBudget = async (budgetId: string) => {
    await deleteBudget(budgetId);
    refreshBudget();
  };
  const handleBudget = async (create: boolean) => {
    let newBudget = {} as BudgetModel;
    if (create) {
      newBudget = await createBudget(budget);
      refreshBudget();
      setBudget(defaultBudget);
    } else {
      newBudget = await updateBudget(budget);
      refreshBudget();
      const updatedBudget: BudgetInterface = {
        budgetId: newBudget.budgetId,
        amount: newBudget.amount,
        categoryId: newBudget.categoryId,
        year: parseInt(newBudget.year, 10),
        month: parseInt(newBudget.month, 10),
      };

      setBudget(updatedBudget);
    }
  };

  return (
    <FormBox
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleBudget(createNewBudget);
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={budget.categoryId}
          label="Category"
          onChange={(e) =>
            setBudget({
              ...budget,
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
        value={budget.amount}
        // eslint-disable-next-line
          onChange={(e) => setBudget({...budget, amount: e.target.value})}
        id="outlined-number"
        label="Number"
        type="text"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["month", "year"]}
          label="Month and Year"
          minDate={new Date("2020-01-01")}
          maxDate={new Date("2030-12-31")}
          value={new Date(budget.year, budget.month)}
          onChange={(newDate) => {
            setBudget({
              ...budget,
              month: new Date(newDate as Date).getMonth(),
              year: new Date(newDate as Date).getFullYear(),
            });
          }}
          renderInput={(params) => (
            // eslint-disable-next-line
              <TextField {...params} helperText={null} />
          )}
        />
      </LocalizationProvider>
      {createNewBudget ? (
        <Button type="submit" variant="contained">
          Submit Budget Item
        </Button>
      ) : (
        <Button startIcon={<EditIcon />} type="submit" variant="contained">
          Update Budget Item
        </Button>
      )}
      {!createNewBudget && (
        <Button
          startIcon={<DeleteIcon />}
          sx={{ backgroundColor: "danger.main" }}
          variant="contained"
          onClick={() => handleDeleteBudget(budget.budgetId)}
        >
          Delete Budget Item
        </Button>
      )}
    </FormBox>
  );
}
