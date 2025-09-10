"use client";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { usePlayground } from "@/features/playground/hooks/usePlayground";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useParams } from "next/navigation";
import TemplateFileTree from "@/features/playground/components/playground-explorer";

import React from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  } = usePlayground(id);

  // console.log("playgroundData : ", playgroundData);
  // console.log("templateData  : ", templateData);

  return (
    <TooltipProvider>
      <>
        {templateData && <TemplateFileTree data={templateData} />}

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" />

            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-col flex-1">
                <h1 className="text-sm font-medium">
                  {playgroundData?.title || "Code Playground"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {/* {openFiles.length} file(s) open
                  {hasUnsavedChanges && " • Unsaved changes"} */}
                </p>
              </div>
            </div>
          </header>
        </SidebarInset>
      </>
    </TooltipProvider>
  );
};

export default Page;
