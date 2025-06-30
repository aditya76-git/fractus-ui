import { createContext, useContext } from "react";

const ExplorerContext = createContext();

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error('useExplorer must be used within an ExplorerProvider');
  }
  return context;
};

export { ExplorerContext };