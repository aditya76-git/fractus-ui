// Main Explorer component with fixed layout
import clsx from "clsx";
import React, { useState } from "react";
import { ExplorerContext } from "./context/explorer-context";
import { getResponsiveWidthClass } from "./utils/responsive";
import { useWindowSize } from "@/hooks/use-window-size"

import {
  Navigator,
  NavigatorHeader,
  NavigatorLeft,
  NavigatorRight,
  NavigatorBody,
  NavigatorMobileOnly,
  NavigatorDesktopOnly,
  NavigatorFooter
} from "./navigator";

import {
  Viewer,
  ViewerLeft,
  ViewerRight,
  ViewerLeftNav,
  ViewerRightMobileOnly,
  ViewerRightDesktopOnly,
  ViewerHeader,
  ViewerContent
} from "./viewer";

import { ToggleFullScreen } from "./components/toggle-fullscreen";

const Explorer = ({ master, children, config }) => {
  const { width } = useWindowSize();
  const isMobileView = width < 768;
  const [fullScreen, setFullScreen] = useState(false);

  const pathname = config?.getPathname();
  const selectedBlock = React.useMemo(() => {
    const allBlocks = master.flatMap((section) =>
      section.type === "block" ? section.blocks : []);
    return allBlocks.find((b) => b.slug === pathname);
  }, [pathname, master]);

  const showNavigator = !selectedBlock || !isMobileView;
  const showViewer = selectedBlock !== null && !(isMobileView && config?.baseSlug === pathname);

  const childArray = React.Children.toArray(children);

  let navigator = null;
  let viewer = null;

  childArray.forEach(child => {
    if (child.type === Navigator) {
      navigator = child;
    } else if (child.type === Viewer) {
      viewer = child;
    }
  });

  // Get the navigator width for fixed positioning
  const navigatorWidthClass = isMobileView ? "w-full" : getResponsiveWidthClass(width);

  return (
    <ExplorerContext.Provider
      value={{
        master,
        config,
        selectedBlock,
        isMobileView,
        fullScreen,
        setFullScreen
      }}>
      <div className="relative h-screen w-full bg-background overflow-hidden">
        {/* Navigator with fixed positioning */}
        {!fullScreen && showNavigator && (
          <div
            className={clsx(
              navigatorWidthClass,
              "absolute top-0 left-0 h-full border-r flex flex-col z-10 bg-background"
            )}>
            {navigator}
          </div>
        )}

        {/* Viewer with proper margin to account for navigator */}
        {showViewer && (
          <div
            className={clsx(
              "absolute top-0 right-0 h-full flex flex-col overflow-hidden",
              !fullScreen && showNavigator && !isMobileView 
                ? `calc(100% - ${getNavigatorWidth(width)})` // Use calc for precise width
                : "w-full"
            )}
            style={{
              width: !fullScreen && showNavigator && !isMobileView 
                ? `calc(100% - ${getNavigatorWidth(width)})` 
                : '100%'
            }}>
            {viewer}
          </div>
        )}

        {!showViewer && !isMobileView && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a component to view
          </div>
        )}
      </div>
    </ExplorerContext.Provider>
  );
};

// Helper function to get exact navigator width
const getNavigatorWidth = (width) => {
  if (width >= 2296) return "25%";
  if (width >= 1706) return "30%";
  if (width >= 1133) return "33%";
  if (width >= 950) return "50%";
  if (width >= 800) return "38%";
  return "100%";
};

Explorer.Navigator = Navigator;
Explorer.NavigatorHeader = NavigatorHeader;
Explorer.NavigatorLeft = NavigatorLeft;
Explorer.NavigatorRight = NavigatorRight;
Explorer.NavigatorBody = NavigatorBody;
Explorer.NavigatorMobileOnly = NavigatorMobileOnly;
Explorer.NavigatorDesktopOnly = NavigatorDesktopOnly;
Explorer.NavigatorFooter = NavigatorFooter;

Explorer.Viewer = Viewer;
Explorer.ViewerLeft = ViewerLeft;
Explorer.ViewerRight = ViewerRight;
Explorer.ViewerLeftNav = ViewerLeftNav;
Explorer.ViewerRightMobileOnly = ViewerRightMobileOnly;
Explorer.ViewerRightDesktopOnly = ViewerRightDesktopOnly;
Explorer.ViewerHeader = ViewerHeader;
Explorer.ViewerContent = ViewerContent;

Explorer.ToggleFullScreen = ToggleFullScreen;

export default Explorer;