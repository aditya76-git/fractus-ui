import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { useExplorer } from "../context/explorer-context";

export const NavigatorBody = ({ children }) => {
  const { master } = useExplorer();

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {master.map((item) =>
            item.type === "section" ? (
              <NavigatorSection key={item.id} data={item} mobileOnly={item?.mobileOnly ?? false} />
            ) : (
              <NavigatorBlockGroup key={item.id} data={item} mobileOnly={item?.mobileOnly ?? false} />
            ))}
        </div>
      </ScrollArea>
      {children}
    </div>
  );
};

const NavigatorSection = ({ data, mobileOnly }) => {
  const { isMobileView, fullScreen, setFullScreen } = useExplorer();

  if (!data?.title && !data?.element) return null;
  if (mobileOnly && !isMobileView) return null;

  return (
    <div className="space-y-2">
      {data.title && <h2 className="text-sm font-medium">{data.title}</h2>}
      {data.element && React.cloneElement(data.element, { meta: data, isMobileView, fullScreen, setFullScreen })}
    </div>
  );
};

const NavigatorBlockGroup = ({ data, mobileOnly }) => {
  const { config, isMobileView } = useExplorer();
  const pathname = config?.getPathname();
  
  if (mobileOnly && !isMobileView) return null;

  return (
    <div className="space-y-3">
      {(data?.title || data?.description) && (
        <div className="space-y-1">
          {data?.title && <p className="text-sm font-medium">{data.title}</p>}
          {data?.description && (
            <p className="text-sm text-muted-foreground">{data.description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {data.blocks.map((block) => {
          const isActive = pathname === block.slug;

          return (
            <button
              key={block.id}
              onClick={() => config?.navigate(block.slug)}
              className={clsx(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                isActive && "bg-muted border border-gray-600"
              )}>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center w-full">
                  <div className="overflow-hidden rounded-md aspect-square">
                    {block.icon}
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">{block.header ?? ""}</div>
                </div>
                <div className="text-sm mt-4">
                  <h3 className="font-medium leading-none whitespace-nowrap">
                    {block.title}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};