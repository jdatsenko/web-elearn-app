"use client";

import TopicsNavMenu from "@/app/components/TopicsNavMenu";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function TopicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isTopicsNavOpen, setIsTopicsNavOpen] = useState(false);

  const toggleTopicsNav = () => {
    setIsTopicsNavOpen(!isTopicsNavOpen);
  };

  return (
    <>
      {/*     
        <ResizablePanelGroup  direction="horizontal" >
        <ResizablePanel
        className="h-full overflow-y-auto"
          defaultSize={22}
          collapsible={false}
        >
          <Separator />
          <TopicsNavMenu
          />
        </ResizablePanel>
        <ResizablePanel  defaultSize={78} id="topic">{children}</ResizablePanel>
        </ResizablePanelGroup> */}

      <div className={`flex h-full w-full `}>
        <div
          className={`w-full  sm:w-1/4 ${isTopicsNavOpen ? "block" : "hidden"}`}
        >
          <TopicsNavMenu />
        </div>
        <div className={`w-${isTopicsNavOpen ? "3/4" : "full"}`}>
          {children}
        </div>
        <button
          className="fixed z-[99999] right-4 top-20 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
          onClick={toggleTopicsNav}
        >
          {isTopicsNavOpen ? "Skryť" : "Témy"}
        </button>
        <style jsx>{`
          @media (max-width: 640px) {
            .fixed {
              right: unset;
              left: 15px; 
              top: 70px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
