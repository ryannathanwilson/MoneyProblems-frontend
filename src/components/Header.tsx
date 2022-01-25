import React, { useState } from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ViewListIcon from "@mui/icons-material/ViewList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Slide,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAppStore } from "./store";
import { Handlers } from "../App";

interface HeaderInterface {
  handlers: Handlers;
}

export default function Header({ handlers }: HeaderInterface) {
  const { store } = useAppStore();
  const [value, setValue] = useState(0);
  const theme = useTheme();

  return (
    <>
      <Slide direction="down" in={store.loggedIn} mountOnEnter unmountOnExit>
        <AppBar position="static">
          <Toolbar>
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
      <Box
        component={Paper}
        sx={{
          zIndex: 100,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 4,
          boxShadow: 8,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="all-transactions"
            label="Transactions"
            icon={<ViewListIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="categories"
            label="Categories"
            icon={<CategoryIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="budget"
            label="Budget"
            icon={<EqualizerIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}
