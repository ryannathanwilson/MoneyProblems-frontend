import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Slide } from "@mui/material";
import { useAppStore } from "./store";
import { Handlers } from "../App";

interface HeaderInterface {
  handlers: Handlers;
}

export default function Header({ handlers }: HeaderInterface) {
  const { store, setStore } = useAppStore();
  return (
    <Slide direction="down" in={store.loggedIn} mountOnEnter unmountOnExit>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mo Money Mo Problems
          </Typography>
          <Button onClick={() => handlers.handleShowLogin()} color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
