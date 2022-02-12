import { useQuery, UseQueryResult } from "react-query";
import {
  BudgetInterface,
  CategoryInterface,
  TransactionInterface,
} from "../components/store";
import { getBudgetsByUser, getBudgetByMonth } from "./budget";
import { getCategories } from "./categories";
import { getTransactionsYearToDate } from "./transactions";

export function useBudget<T extends BudgetInterface[]>(): UseQueryResult<T> {
  return useQuery(["budgets"], () => {
    return getBudgetsByUser();
  });
}

export function useBudgetByMonth<T extends BudgetInterface[]>(
  month: number,
  year: number
): UseQueryResult<T> {
  return useQuery(["budgets"], () => {
    return getBudgetByMonth(month, year);
  });
}

// Transactions by year
export function useTransactionsByYear<T extends TransactionInterface[]>(
  year: number
): UseQueryResult<T> {
  return useQuery(["transactions"], () => {
    return getTransactionsYearToDate(year);
  });
}

export function useCategories<
  T extends CategoryInterface[]
>(): UseQueryResult<T> {
  return useQuery(["categories"], () => {
    return getCategories();
  });
}
