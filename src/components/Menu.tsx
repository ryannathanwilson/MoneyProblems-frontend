import React from "react";
import { NavLink } from "react-router-dom";
import {
  Link as CustomLink,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Menu() {
  interface MenuItem {
    text: string;
    route: string;
  }
  const menuItems: MenuItem[] = [
    {
      text: "Home",
      route: "/",
    },
    {
      text: "All Transactions",
      route: "all-transactions",
    },
    {
      text: "Categories",
      route: "categories",
    },
    {
      text: "Budget",
      route: "budget",
    },
  ];
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems.map((item) => (
          <CustomLink
            underline="none"
            component={NavLink}
            to={item.route}
            key={item.text}
          >
            <ListItem button>
              <ListItemText primary={item.text} />
            </ListItem>
          </CustomLink>
        ))}
      </List>
    </Box>
  );
}
