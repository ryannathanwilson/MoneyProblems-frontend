import React, { useEffect, useState } from "react";
import { Typography, Slide, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useAppStore,
  OverviewInterface,
  CategoryInterface,
  TransactionInterface,
  BudgetInterface,
} from "./store";
import Container from "./Container";
import {
  useCategories,
  useTransactionsByYear,
  useBudget,
} from "../api/queries";

export default function Overview() {
  const { store } = useAppStore();
  const [overview, setOverview] = useState<OverviewInterface[] | undefined>();
  const { data: categories } = useCategories();
  const { data: transactions } = useTransactionsByYear(
    new Date().getFullYear()
  );
  const { data: budgets } = useBudget();

  useEffect(() => {
    if (categories && transactions && budgets) {
      const newOverview: OverviewInterface[] = categories.map(
        (c: CategoryInterface) => {
          const monthExpenses = transactions
            .filter((t: TransactionInterface) => {
              return (
                new Date(t.date).getMonth() === new Date().getMonth() &&
                t.categoryId === c.categoryId
              );
            })
            .reduce(
              (total: number, transaction: TransactionInterface) =>
                total + parseFloat(transaction.amount),
              0
            );
          const ytdExpenses = store.transactions
            .filter((transaction: TransactionInterface) => {
              return transaction.categoryId === c.categoryId;
            })
            .reduce(
              (total: number, transaction: TransactionInterface) =>
                total + parseFloat(transaction.amount),
              0
            );
          const monthBudgetItem = budgets.find((b: BudgetInterface) => {
            return (
              b.categoryId === c.categoryId && b.month === new Date().getMonth()
            );
          }) || { amount: "0" };
          const ytdBudgetItems = budgets.filter((b: BudgetInterface) => {
            return (
              b.categoryId === c.categoryId && b.month <= new Date().getMonth()
            );
          }) || { amount: 0 };
          const ytdBudget = ytdBudgetItems.reduce(
            (total: number, budget: BudgetInterface) =>
              total + parseFloat(budget.amount),
            0
          );
          return {
            category: c.category,
            monthBudget: monthBudgetItem?.amount,
            monthExpenses: monthExpenses.toFixed(0),
            ytdExpenses: ytdExpenses.toFixed(0),
            ytdBudget: ytdBudget.toFixed(0),
          };
        }
      );

      setOverview(newOverview);
    }
    // eslint-disable-next-line
    }, [transactions, budgets, categories]);

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <Container component="form">
        <Typography variant="h2" component="div" gutterBottom>
          Overview
        </Typography>
        <TableContainer component={Paper} elevation={4}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Month</TableCell>
                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {overview &&
                overview.map((row) => (
                  <TableRow
                    key={row.category}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell align="right">
                      ${row.monthExpenses} / ${row.monthBudget}
                    </TableCell>
                    <TableCell align="right">
                      ${row.ytdExpenses} / ${row.ytdBudget}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Slide>
  );
}
