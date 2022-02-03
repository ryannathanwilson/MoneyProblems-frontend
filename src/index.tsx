import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./components/store";

// TODO:
// - Make number slot bigger
// - delete button and update button on transactions
// - Transaction for current month only
// - Toggle current month
// - Budget page makeover

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
