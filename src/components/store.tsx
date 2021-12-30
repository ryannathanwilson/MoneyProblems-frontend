import React, { useContext, createContext } from "react";

interface GlobalState {
  username: string;
  loggedIn?: boolean | undefined;
}

export const initialStore: GlobalState = {
  username: "",
};

interface AppContextProps {
  store: GlobalState;
  setStore: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

function useAppStore(): AppContextProps {
  return useContext(AppContext);
}

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = React.useState<GlobalState>(initialStore);
  // eslint-disable-next-line
  const value = React.useMemo(() => ({ store, setStore }), [store]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { useAppStore, AppContextProvider };
