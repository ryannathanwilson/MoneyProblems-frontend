import React from "react";
import { Typography, Slide } from "@mui/material";
import { useAppStore } from "../components/store";
import TransactionForm from "../components/TransactionForm";
import Overview from "../components/Overview";
import Container from "../components/Container";

export default function TransactionPage() {
  const { store } = useAppStore();

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <Container>
        <Typography
          textAlign="center"
          variant="h2"
          component="div"
          gutterBottom
        >
          Add expense
        </Typography>
        <TransactionForm />
        <Overview />
      </Container>
    </Slide>
  );
}
