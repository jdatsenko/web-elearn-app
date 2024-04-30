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
      <div className="flex flex-col h-full w-full">
        {/* Topic Navbar Menu */}
        <div className={`flex flex-wrap justify-center p-4 }`}>
          <TopicsNavMenu />
        </div>

        {/* Topics */}
        <div className="flex flex-wrap justify-center h-full w-full overflow-y-auto">
          {children}
        </div>

      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fixed {
            right: unset;
            left: 15px; 
            top: 70px;
          }
        }
      `}</style>
    </>
  );
}

