import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Slide,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppStore } from "../components/store";
import { deleteTransaction } from "../api/transactions";
import FormBox from "../components/FormBox";

export default function AllTransactions() {
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
      <FormBox>
        {store.transactions.map((row) => {
          const date = new Date(row.date).toLocaleString("en-US", {
            dateStyle: "medium",
          });
          return (
            <Accordion key={row.transactionId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{date}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <IconButton
                    aria-label="edit"
                    /// / onClick={() => handleOpenModal(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteTransaction(row.transactionId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </FormBox>
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
