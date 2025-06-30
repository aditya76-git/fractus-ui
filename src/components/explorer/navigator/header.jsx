import { useExplorer } from "../context/explorer-context";

export const NavigatorHeader = ({ children }) => children;

export const NavigatorLeft = ({ children }) => (
  <div className="flex flex-1 items-center gap-2">{children}</div>
);

export const NavigatorRight = ({ children }) => (
  <div className="flex items-center gap-2">{children}</div>
);

export const NavigatorMobileOnly = ({ children }) => {
  const { isMobileView } = useExplorer();
  return isMobileView ? children : null;
};

export const NavigatorDesktopOnly = ({ children }) => {
  const { isMobileView } = useExplorer();
  return !isMobileView ? children : null;
};