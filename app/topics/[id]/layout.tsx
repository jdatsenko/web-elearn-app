"use client";

import TopicsNavMenu from "@/app/components/TopicsNavMenu";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

export default function TopicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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

        <div className="flex h-full max-h-[calc(100vh-68px)]">
          <div className="w-1/4">
            <TopicsNavMenu />
          </div>
          <div className="w-3/4">
            {children}
          </div>  
        </div>
    </>
  );
}
