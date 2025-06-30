import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExplorer } from "../context/explorer-context";

export const ViewerContent = ({ children }) => {
  const { master, config, fullScreen, setFullScreen } = useExplorer();
  const pathname = config?.getPathname();

  const selectedBlock = React.useMemo(() => {
    const allBlocks = master.flatMap((section) =>
      section.type === "block" ? section.blocks : []);
    return allBlocks.find((b) => b.slug === pathname);
  }, [pathname, master]);

  if (!selectedBlock && pathname !== config?.baseSlug) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">No block found for this route.
                      </div>
    );
  }

  return (
    <ScrollArea type="always" className="h-[91vh]">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
            meta: selectedBlock,
          })
          : child)}
    </ScrollArea>
  );
};