import React, { useState, useEffect } from "react";
import "./App.css";
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

export interface Handlers {
  handleLogin: () => void;
  handleShowLogin: () => void;
  handleShowCreateUser: () => void;
}

function App() {
  const { store, setStore } = useAppStore();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);

  const populateStore = async () => {
    const categories = await getCategories();
    const storeCategories = categories.map((cat: any) => {
      return {
        category: cat.category,
        categoryId: cat.categoryId,
      };
    });
    const today = new Date();
    const thisMonthBudget = await getBudgetYearToDate(today.getFullYear());
    const storeBudget = thisMonthBudget.map((budget: any) => {
      return {
        amount: parseInt(budget.amount, 10),
        budgetId: budget.budgetId,
        categoryId: budget.categoryId,
        month: budget.month,
      };
    });
    const transactions = await getTransactionsYearToDate(today.getFullYear());
    const storeTransactions = transactions.map((transaction: any) => {
      return {
        amount: parseFloat(transaction.amount),
        categoryId: transaction.categoryId,
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
  const handlers: Handlers = {
    handleLogin,
    handleShowLogin,
    handleShowCreateUser,
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
    <div className="App">
      <Header handlers={handlers} />
      <Login handlers={handlers} showLogin={showLogin} />
      <CreateUser handlers={handlers} showCreateUser={showCreateUser} />
      <Transaction />
      <Overview />
      <Category />
      <Budget />
    </div>
  );
}

export default App;
