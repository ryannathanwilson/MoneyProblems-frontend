import React, { useState } from "react";
import { Typography, Slide } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppStore } from "../components/store";
import FormBox from "../components/FormBox";

export default function Overview() {
  const { store } = useAppStore();

  function createData(category: string, month: string, year: string) {
    return { category, month, year };
  }

  const rows = [
    createData("Food", "$450 / $500", "$1250 / $3000"),
    createData("Vacation", "$450 / $500", "$1250 / $3000"),
    createData("Retirement", "$450 / $500", "$1250 / $3000"),
  ];

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
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Month</TableCell>
                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.category}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.category}
                  </TableCell>
                  <TableCell align="right">{row.month}</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormBox>
    </Slide>
  );
}
