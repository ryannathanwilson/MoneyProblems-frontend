import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { AppContextProvider } from "./components/store";

// TODO:
// - Make number slot bigger
// - delete button and update button on transactions
// - Transaction for current month only
// - Toggle current month
// - Budget page makeover
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
