import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import clsx from "clsx";
import { useExplorer } from "../context/explorer-context";

export const ViewerLeft = ({ children }) => children;

export const ViewerLeftNav = () => {
  const { master, config } = useExplorer();

  const allBlocks = master
    .filter((item) => item.type === "block")
    .flatMap((item) => item.blocks ?? []);

  const currentIndex = allBlocks.findIndex((b) => b.slug === config?.getPathname());

  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= allBlocks.length - 1;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => config?.navigate(config?.baseSlug)}>
        <X className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={isPrevDisabled}
        onClick={() => !isPrevDisabled && config?.navigate(allBlocks[currentIndex - 1].slug)}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={isNextDisabled}
        onClick={() => !isNextDisabled && config?.navigate(allBlocks[currentIndex + 1].slug)}>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </>
  );
};

export const ViewerRight = ({ children }) => (
  <div className="ml-auto">{children}</div>
);

export const ViewerRightMobileOnly = ({ children }) => {
  const { isMobileView } = useExplorer();
  return isMobileView ? <div className="ml-auto">{children}</div> : null;
};

export const ViewerRightDesktopOnly = ({ children }) => {
  const { isMobileView } = useExplorer();
  return !isMobileView ? <div className="ml-auto">{children}</div> : null;
};

export const ViewerHeader = ({ className }) => {
  const { selectedBlock, fullScreen } = useExplorer();

  if (fullScreen) return null;

  return (selectedBlock?.title || selectedBlock?.description) && (
    <>
      <div className={clsx("grid gap-1 min-w-0", className)}>
        <p className="text-sm font-semibold">{selectedBlock?.title}</p>
        <div className="line-clamp-3 text-xs">
          <p className="text-sm text-muted-foreground">{selectedBlock?.description}</p>
        </div>
      </div>
      <div className="border-t" />
    </>
  );
};