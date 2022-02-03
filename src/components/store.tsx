import React, { useContext, createContext } from "react";

export interface CategoryInterface {
  category: string;
  categoryId: string;
}
export interface BudgetInterface {
  amount: number;
  budgetId: string;
  categoryId: string;
  month: number;
  year: number;
}
export interface TransactionInterface {
  transactionId: string;
  amount?: number;
  category: { categoryId: string; category: string };
  note?: string;
  date: Date;
}
export interface OverviewInterface {
  category: string;
  monthBudget: number;
  ytdBudget?: number;
  monthExpenses: number;
  ytdExpenses?: number;
}
interface GlobalState {
  username?: string;
  loggedIn: boolean | undefined;
  categories: CategoryInterface[];
  budgets: BudgetInterface[];
  transactions: TransactionInterface[];
  overview: OverviewInterface[];
}

export const initialStore: GlobalState = {
  loggedIn: undefined,
  categories: [] as CategoryInterface[],
  budgets: [] as BudgetInterface[],
  transactions: [] as TransactionInterface[],
  overview: [] as OverviewInterface[],
};

interface AppContextProps {
  store: GlobalState;
  setStore: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

function useAppStore(): AppContextProps {
  return useContext(AppContext);
}

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = React.useState<GlobalState>(initialStore);
  // eslint-disable-next-line
  const value = React.useMemo(() => ({ store, setStore }), [store]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { useAppStore, AppContextProvider };
