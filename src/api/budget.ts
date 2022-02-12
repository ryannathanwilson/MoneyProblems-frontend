import config from "../config";
import { BudgetInterface } from "../components/store";

export interface BudgetModel {
  budgetId: string;
  categoryId: string;
  amount: string;
  month: string;
  year: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createBudget(
  budget: BudgetInterface
  // eslint-disable-next-line
): Promise<any> {
  const budgetCreated = await fetch(`${config.api.baseurl}/budget`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      amount: budget.amount,
      month: budget.month,
      year: budget.year,
      categoryId: budget.categoryId,
    }),
  }).then((response) => response.json());
  return budgetCreated;
}

// eslint-disable-next-line
export async function deleteBudget(budgetId: string): Promise<any> {
  const deletedItem = await fetch(`${config.api.baseurl}/budget/${budgetId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((response) => response.json());
  return deletedItem;
}

export async function getBudgetYearToDate(year: number) {
  const allBudgetItems = await fetch(
    `${config.api.baseurl}/budget/by-year/${year}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  ).then((response) => response.json());
  return allBudgetItems;
}

export async function getBudgetByMonth(month: number, year: number) {
  const allBudgetItems = await fetch(
    `${config.api.baseurl}/budget/by-month/${month}/${year}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  ).then((response) => response.json());
  return allBudgetItems;
}

export async function getBudgetsByUser() {
  const allBudgetItems = await fetch(`${config.api.baseurl}/budget`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((response) => response.json());
  return allBudgetItems;
}

export async function updateBudget(
  budget: BudgetInterface
): Promise<BudgetModel> {
  const updatedBudget = await fetch(
    `${config.api.baseurl}/budget/update/${budget.budgetId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        budgetId: budget.budgetId,
        amount: budget.amount,
        categoryId: budget.categoryId,
        year: budget.year,
        month: budget.month,
      }),
    }
  ).then((response) => response.json());
  return updatedBudget;
}
