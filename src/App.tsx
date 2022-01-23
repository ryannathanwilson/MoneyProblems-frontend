import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import Overview from "./pages/Overview";
import Category from "./pages/Category";
import { useAppStore } from "./components/store";
import { refreshAccessToken } from "./api/auth";
import Header from "./components/Header";
import Budget from "./pages/Budget";
import { getCategories } from "./api/categories";
import { getBudgetYearToDate } from "./api/budget";
import { getTransactionsYearToDate } from "./api/transactions";
import AllTransactions from "./pages/AllTransactions";
import getDesignTokens from "./theme";

export interface Handlers {
  handleLogin: () => void;
  handleShowLogin: () => void;
  handleShowCreateUser: () => void;
  handleThemeToggle: () => void;
}

function App() {
  const { store, setStore } = useAppStore();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const populateStore = async () => {
    const categories = await getCategories();
    // eslint-disable-next-line
    const storeCategories = categories.map((cat: any) => {
      return {
        category: cat.category,
        categoryId: cat.categoryId,
      };
    });
    const today = new Date();
    const thisMonthBudget = await getBudgetYearToDate(today.getFullYear());
    // eslint-disable-next-line
    const storeBudget = thisMonthBudget.map((budget: any) => {
      return {
        amount: parseInt(budget.amount, 10),
        budgetId: budget.budgetId,
        categoryId: budget.categoryId,
        month: budget.month,
      };
    });
    const transactions = await getTransactionsYearToDate(today.getFullYear());
    // eslint-disable-next-line
    const storeTransactions = transactions.map((transaction) => {
      return {
        transactionId: transaction.transactionId,
        amount: transaction.amount,
        category: {
          categoryId: transaction.category.categoryId,
          category: transaction.category.category,
        },
        date: transaction.date,
      };
    });

    setStore((prevStore) => {
      return {
        ...prevStore,
        categories: storeCategories,
        budgets: storeBudget,
        transactions: storeTransactions,
      };
    });
  };

  useEffect(() => {
    if (store.loggedIn) {
      populateStore();
    }
    // eslint-disable-next-line
    },[store.loggedIn])

  const handleLogin = () => {
    setShowLogin(false);
    setShowCreateUser(false);
    setTimeout(
      () =>
        setStore((prevStore) => {
          return { ...prevStore, loggedIn: true };
        }),
      500
    );
  };
  const handleShowLogin = () => {
    localStorage.clear();
    setStore((prevStore) => {
      return { ...prevStore, loggedIn: false };
    });
    setShowCreateUser(false);
    setTimeout(() => setShowLogin(true), 500);
  };
  const handleShowCreateUser = () => {
    setStore((prevStore) => {
      return { ...prevStore, loggedIn: false };
    });
    setShowLogin(false);
    setTimeout(() => setShowCreateUser(true), 500);
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handlers: Handlers = {
    handleLogin,
    handleShowLogin,
    handleShowCreateUser,
    handleThemeToggle,
  };

  let tokenExpire: ReturnType<typeof setTimeout>;
  const silentlyRefreshToken = async () => {
    if (tokenExpire !== undefined) {
      clearTimeout(tokenExpire);
    }
    try {
      const refreshedToken = await refreshAccessToken();
      if (refreshedToken.userLoggedIn) {
        localStorage.setItem("accessToken", refreshedToken.accessToken);
        localStorage.setItem("refreshToken", refreshedToken.refreshToken);
        handleLogin();
      } else {
        handleShowLogin();
      }
    } catch (error) {
      handleShowLogin();
    }
    tokenExpire = setTimeout(silentlyRefreshToken, 270000);
  };

  useEffect(() => {
    silentlyRefreshToken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (store.loggedIn === false) {
      handleShowLogin();
    } else if (store.loggedIn === true) {
      handleLogin();
    }
    // eslint-disable-next-line
  },[store.loggedIn]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header handlers={handlers} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login handlers={handlers} showLogin={showLogin} />
                <CreateUser
                  handlers={handlers}
                  showCreateUser={showCreateUser}
                />
                <Transaction />
                <Overview />
              </>
            }
          />
          <Route path="all-transactions" element={<AllTransactions />} />
          <Route path="categories" element={<Category />} />
          <Route path="budget" element={<Budget />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
