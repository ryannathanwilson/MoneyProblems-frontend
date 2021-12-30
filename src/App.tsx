import React, { useState, useEffect } from "react";
import "./App.css";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import { useAppStore } from "./components/store";
import { refreshAccessToken } from "./api/auth";

export interface Handlers {
  handleLogin: () => void;
  handleShowLogin: (status: boolean) => void;
  handleShowCreateUser: (status: boolean) => void;
}

function App() {
  const { store, setStore } = useAppStore();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);

  const handleLogin = () => {
    setShowLogin(false);
    setShowCreateUser(false);
    setTimeout(() => setStore({ ...store, loggedIn: true }), 500);
  };
  const handleShowLogin = () => {
    setStore({ ...store, loggedIn: false });
    setShowCreateUser(false);
    setTimeout(() => setShowLogin(true), 500);
  };
  const handleShowCreateUser = () => {
    setStore({ ...store, loggedIn: false });
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
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken.userLoggedIn) {
      localStorage.setItem("accessToken", refreshedToken.accessToken);
      localStorage.setItem("refreshToken", refreshedToken.refreshToken);
      handleLogin();
    } else {
      localStorage.clear();
      handleShowLogin();
    }
    tokenExpire = setTimeout(silentlyRefreshToken, 270000);
  };

  useEffect(() => {
    silentlyRefreshToken();
  }, []);
  useEffect(() => {
    console.log(showLogin);
  }, [showLogin]);

  useEffect(() => {
    if (store.loggedIn === false) {
      handleShowLogin();
    } else {
      handleLogin();
    }
    // eslint-disable-next-line
  },[store.loggedIn]);
  // if loggedIn false then show loading screen
  // if loggedIn true show transaction screen

  return (
    <div className="App">
      {/* menu bar with logout */}
      <Login handlers={handlers} showLogin={showLogin} />
      <CreateUser handlers={handlers} showCreateUser={showCreateUser} />
      <Transaction />
    </div>
  );
}

export default App;
