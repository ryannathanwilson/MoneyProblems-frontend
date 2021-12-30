import React, { useState } from "react";
import { Typography, Slide, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { createUser } from "../api/users";
import { loginUser } from "../api/auth";
import { Handlers } from "../App";
import FormBox from "../components/FormBox";

interface CreateUserInterface {
  handlers: Handlers;
  showCreateUser: boolean;
}

export default function CreateUser({
  handlers,
  showCreateUser,
}: CreateUserInterface) {
  const [username, setUsername] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleCreateUser = async () => {
    if (password === confirmPassword) {
      setIsFetching(true);
      const userCreated = await createUser(username, email, password);
      if (userCreated) {
        const userLoggedIn = await loginUser(username, password);
        if (userLoggedIn) {
          localStorage.setItem("accessToken", userLoggedIn.accessToken);
          localStorage.setItem("refreshToken", userLoggedIn.refreshToken);
          setIsFetching(false);
          handlers.handleLogin();
        }
      } else {
        setUsername("");
        setUserNameError(true);
        setEmail("");
        setEmailError(true);
        setPassword("");
        setPasswordError(true);
        setConfirmPassword("");
        setConfirmPasswordError(true);
        setErrorMessage("Failed to create account");
      }
    } else {
      setErrorMessage("Passwords do not match");
      setPasswordError(true);
      setConfirmPasswordError(true);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Slide direction="down" in={showCreateUser} mountOnEnter unmountOnExit>
      <FormBox component="form">
        <Typography variant="h1" component="div" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          error={userNameError}
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          error={emailError}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          autoComplete="off"
          error={passwordError}
        />
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm password"
          type="password"
          autoComplete="off"
          error={confirmPasswordError}
          helperText={errorMessage}
        />
        <LoadingButton
          onClick={handleCreateUser}
          loading={isFetching}
          loadingIndicator="Loading..."
          variant="contained"
        >
          Create Account
        </LoadingButton>
        <Button onClick={() => handlers.handleShowLogin(true)}>
          Return to login
        </Button>
      </FormBox>
    </Slide>
  );
}
