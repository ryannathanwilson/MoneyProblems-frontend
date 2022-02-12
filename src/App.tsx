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
import TransactionPage from "./pages/TransactionPage";
import Category from "./pages/Category";
import { useAppStore } from "./components/store";
import { refreshAccessToken } from "./api/auth";
import Header from "./components/Header";
import Budget from "./pages/Budget";
import AllTransactions from "./pages/AllTransactions";
import getDesignTokens from "./utilities/theme";

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
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("mode") as PaletteMode) || "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
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
    setMode((prevMode) => {
      const toggledMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("mode", toggledMode);
      return toggledMode;
    });
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
                <TransactionPage />
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
