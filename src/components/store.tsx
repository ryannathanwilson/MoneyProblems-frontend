import React, { useContext, createContext } from "react";

interface Category {
  category: string;
  categoryId: string;
}
interface GlobalState {
  username?: string;
  loggedIn: boolean | undefined;
  categories: Category[];
}

export const initialStore: GlobalState = {
  loggedIn: undefined,
  categories: [] as Category[],
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
