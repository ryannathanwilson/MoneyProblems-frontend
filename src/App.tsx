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

export interface Handlers {
  handleLogin: () => void;
  handleShowLogin: () => void;
  handleShowCreateUser: () => void;
}

function App() {
  const { store, setStore } = useAppStore();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);

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

  let tokenExpire: any;
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
      console.log(error);
      handleShowLogin();
    }
    tokenExpire = setTimeout(silentlyRefreshToken, 270000);
  };

  useEffect(() => {
    silentlyRefreshToken();
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
