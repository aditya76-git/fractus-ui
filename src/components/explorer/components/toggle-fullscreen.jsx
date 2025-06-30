import { Toggle } from "@/components/ui/toggle";
import { useExplorer } from "../context/explorer-context";

export const ToggleFullScreen = ({ children }) => {
  const { fullScreen, setFullScreen, isMobileView } = useExplorer();

  return (
    <Toggle
      disabled={isMobileView}
      aria-label="Toggle fullscreen"
      onClick={() => setFullScreen(prev => !prev)}>
      {children}
    </Toggle>
  );
};