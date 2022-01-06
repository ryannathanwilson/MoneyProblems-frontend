import React, { useEffect, useState } from "react";
import { Typography, Slide, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppStore, OverviewInterface } from "../components/store";
import FormBox from "../components/FormBox";

export default function Overview() {
  const { store } = useAppStore();
  const [overview, setOverview] = useState<OverviewInterface[] | undefined>();
  useEffect(() => {
    const newOverview: OverviewInterface[] = store.categories.map(
      // eslint-disable-next-line
      (cat: any) => {
        const monthExpenses = store.transactions
          // eslint-disable-next-line
          .filter((exp: any) => {
            return (
              new Date(exp.date).getMonth() === new Date().getMonth() &&
              exp.categoryId === cat.categoryId
            );
          })
          .reduce(
            // eslint-disable-next-line
            (total: number, transaction: any) => total + transaction.amount,
            0
          );
        const ytdExpenses = store.transactions
          // eslint-disable-next-line
          .filter((transaction: any) => {
            return transaction.categoryId === cat.categoryId;
          })
          .reduce(
            // eslint-disable-next-line
            (total: number, transaction: any) => total + transaction.amount,
            0
          );
        // eslint-disable-next-line
        const monthBudgetItem = store.budgets.find((item: any) => {
          return (
            item.categoryId === cat.categoryId &&
            item.month === new Date().getMonth()
          );
        }) || { amount: 0 };
        // eslint-disable-next-line
        const ytdBudgetItems = store.budgets.filter((item: any) => {
          return (
            item.categoryId === cat.categoryId &&
            item.month <= new Date().getMonth()
          );
        }) || { amount: 0 };
        const ytdBudget = ytdBudgetItems.reduce(
          // eslint-disable-next-line
          (total: number, budget: any) => total + budget.amount,
          0
        );
        return {
          category: cat.category,
          monthBudget: monthBudgetItem?.amount,
          monthExpenses,
          ytdExpenses,
          ytdBudget,
        };
      }
    );

    setOverview(newOverview);
    // eslint-disable-next-line
    }, [store]);

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
      </FormBox>
    </Slide>
  );
}
