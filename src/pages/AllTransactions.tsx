import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useAppStore } from "../components/store";
import Container from "../components/Container";
import TransactionForm from "../components/TransactionForm";

export default function AllTransactions() {
  const Grid = styled("div")({
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "120px 1fr",
    textAlign: "left",
  });
  const AmountBox = styled("div")({
    flexGrow: 0,
    fontWeight: "bold",
    fontSize: "1.5em",
  });
  const CategoryBox = styled("div")({
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: "1.5em",
  });
  const DateBox = styled("div")({
    flexGrow: 0,
  });
  const NoteBox = styled("div")({});
  const { store } = useAppStore();

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <Container sx={{ gridGap: 0 }}>
        {store.transactions.map((row) => {
          const day = new Date(row.date).toLocaleString("en-US", {
            day: "numeric",
          });
          const month = new Date(row.date).toLocaleString("en-US", {
            month: "short",
          });
          const date = `${month} ${day}`;
          return (
            <Accordion key={row.transactionId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid>
                  <AmountBox>${row.amount}</AmountBox>
                  <CategoryBox>{row.category.category}</CategoryBox>
                  <DateBox>{date}</DateBox>
                  <NoteBox>{row.note}</NoteBox>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <TransitionGroup>
                  <TransactionForm
                    transaction={row}
                    createNewTransaction={false}
                  />
                </TransitionGroup>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </Slide>
  );
}
