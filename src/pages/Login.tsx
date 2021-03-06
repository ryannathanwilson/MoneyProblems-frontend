import React, { useState } from "react";
import { Typography, Slide, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { Handlers } from "../App";
import Container from "../components/Container";
import { loginUser } from "../api/auth";

interface LoginInterface {
  handlers: Handlers;
  showLogin: boolean;
}

export default function Login({ handlers, showLogin }: LoginInterface) {
  const [username, setUsername] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const resetLocalState = () => {
    setUsername("");
    setUserNameError(false);
    setPassword("");
    setPasswordError(false);
    setErrorMessage("");
  };

  const handleLoginUser = async () => {
    const loginResponse = await loginUser(username, password);
    setIsFetching(false);
    if (loginResponse.userLoggedIn) {
      localStorage.setItem("accessToken", loginResponse.accessToken);
      localStorage.setItem("refreshToken", loginResponse.refreshToken);
      resetLocalState();
      handlers.handleLogin();
    } else {
      setUsername("");
      setUserNameError(true);
      setPassword("");
      setPasswordError(true);
      setErrorMessage("Username or password was incorrect");
    }
  };

  return (
    <Slide direction="right" in={showLogin} mountOnEnter unmountOnExit>
      <Container
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginUser();
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Log In
        </Typography>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          error={userNameError}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          autoComplete="off"
          error={passwordError}
          helperText={errorMessage}
        />
        <LoadingButton
          type="submit"
          loading={isFetching}
          loadingIndicator="Loading..."
          variant="contained"
        >
          Log in
        </LoadingButton>
        <Button
          onClick={() => {
            handlers.handleShowCreateUser();
            resetLocalState();
          }}
        >
          Go to sign up
        </Button>
      </Container>
    </Slide>
  );
}
