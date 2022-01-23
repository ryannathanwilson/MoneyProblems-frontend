import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Slide, SwipeableDrawer, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAppStore } from "./store";
import { Handlers } from "../App";
import Menu from "./Menu";

interface HeaderInterface {
  handlers: Handlers;
}

export default function Header({ handlers }: HeaderInterface) {
  const { store } = useAppStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Slide direction="down" in={store.loggedIn} mountOnEnter unmountOnExit>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mo Money Mo Problems
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handlers.handleThemeToggle}
            >
              {theme.palette.mode === "light" ? (
                <Brightness4 />
              ) : (
                <Brightness7 />
              )}
            </IconButton>
            <Button onClick={() => handlers.handleShowLogin()} color="inherit">
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Menu />
      </SwipeableDrawer>
    </>
  );
}
