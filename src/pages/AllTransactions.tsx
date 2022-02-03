import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Slide,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { useAppStore } from "../components/store";
import { deleteTransaction } from "../api/transactions";
import Container from "../components/Container";
import TransactionForm from "../components/TransactionForm";

export default function AllTransactions() {
  const [edit, setEdit] = useState<boolean>(false);
  const openEdit = () => {
    setEdit((prev) => !prev);
  };
  const Grid = styled("div")({
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "100px 1fr",
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
  const IconBox = styled("div")({
    display: "flex",
    justifyContent: "space-around",
  });
  const { store, setStore } = useAppStore();
  // const handleOpenModal = (transaction: any) => {
  // console.log(transaction);
  // };
  // const handleUpdateTransaction = async () => {
  // const updatedTransaction = await
  // }
  const handleDeleteTransaction = async (transactionId: string) => {
    deleteTransaction(transactionId);
    const updatedTransactionList = store.transactions.filter(
      (transaction) => transaction.transactionId !== transactionId
    );
    setStore({
      ...store,
      transactions: updatedTransactionList,
    });
  };

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
                expandIcon={
                  // <>
                  // <EditIcon />
                  // <DeleteIcon />
                  // </>
                  <ExpandMoreIcon />
                }
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
                  {edit && (
                    <Collapse>
                      <TransactionForm
                        transaction={row}
                        createNewTransaction={false}
                      />
                    </Collapse>
                  )}
                </TransitionGroup>
                <IconBox>
                  <IconButton
                    aria-label="edit"
                    /// / onClick={() => handleOpenModal(row)}
                  >
                    <EditIcon aria-label="edit" onClick={openEdit} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteTransaction(row.transactionId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </IconBox>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </Slide>
  );
}
// const TransactionAccordion: Function = (
// transactions: TransactionInterface[],
// ): JSX.Element[] {
// return (
// <>
// {store.transactions.map((row) => {
// return (
// <Accordion key={row.transactions}>
// <AccordionSummary
// expandIcon={<ExpandMoreIcon />}
// aria-controls="panel1a-content"
// id="panel1a-header"
// >
// <Typography>Accordion 1</Typography>
// </AccordionSummary>
// <AccordionDetails>
// <Typography>
// <IconButton
// aria-label="edit"
/// / onClick={() => handleOpenModal(row)}
// >
// <EditIcon />
// </IconButton>
// <IconButton
// aria-label="delete"
// onClick={() => handleDeleteTransaction(row.transactionId)}
// >
// <DeleteIcon />
// </IconButton>
// Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
// eget.
// </Typography>
// </AccordionDetails>
// </Accordion>
// );
// })}
// </>
// );
// }
