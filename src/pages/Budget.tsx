import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  Typography,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import mapCategory from "../utilities/utilities";
import { useCategories, useBudgetByMonth } from "../api/queries";
import BudgetForm from "../components/BudgetForm";
import Container from "../components/Container";
import { useAppStore } from "../components/store";

export default function BudgetPage() {
  const { store } = useAppStore();
  const { data: budget } = useBudgetByMonth(0, 2022);
  const { data: categories } = useCategories();
  const Flex = styled("div")({
    display: "flex",
    gridTemplateColumns: "120px 1fr",
    textAlign: "left",
  });
  const AmountBox = styled("div")({
    flexGrow: 1,
    fontSize: "1.2rem",
  });
  const CategoryBox = styled("div")({
    width: "160px",
    flexGrow: 0,
    fontSize: "1.2rem",
  });

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <Container sx={{ gridGap: 0 }}>
        <Typography variant="h2" component="div" gutterBottom>
          Current Month
        </Typography>

        {budget &&
          categories &&
          budget.map((row) => {
            return (
              <Accordion key={row.budgetId}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Flex>
                    <CategoryBox>
                      {mapCategory(row.categoryId, categories)}
                    </CategoryBox>
                    <AmountBox>${row.amount}</AmountBox>
                  </Flex>
                </AccordionSummary>
                <AccordionDetails>
                  <TransitionGroup>
                    <BudgetForm budgetProps={row} createNewBudget={false} />
                  </TransitionGroup>
                </AccordionDetails>
              </Accordion>
            );
          })}
        <BudgetForm />
      </Container>
    </Slide>
  );
}
