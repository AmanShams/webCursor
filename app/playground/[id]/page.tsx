"use client";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { usePlayground } from "@/features/playground/hooks/usePlayground";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useParams } from "next/navigation";
import { TemplateFileTree } from "@/features/playground/components/playground-explorer";
import { useFileExplorer } from "@/features/playground/hooks/useFileExplorer";
import React, { useEffect, useState } from "react";

import {
  FileText,
  FolderOpen,
  AlertCircle,
  Save,
  X,
  Settings,
  SaveIcon,
  SaveAllIcon,
  Bot,
  BotMessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import { TemplateFile } from "@prisma/client";
import PlaygroundEditor from "@/features/playground/components/playground-editor";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  } = usePlayground(id);

  const {
    activeFileId,
    closeAllFiles,
    openFile,
    closeFile,
    editorContent,
    updateFileContent,
    handleAddFile,
    handleAddFolder,
    handleDeleteFile,
    handleDeleteFolder,
    handleRenameFile,
    handleRenameFolder,
    openFiles,
    setTemplateData,
    setActiveFileId,
    setPlaygroundId,
    setOpenFiles,
  } = useFileExplorer();

  useEffect(() => {
    setPlaygroundId(id);
  }, [id, setPlaygroundId]);

  useEffect(() => {
    if (templateData && !openFiles.length) {
      setTemplateData(templateData);
    }
  }, [templateData, setTemplateData, openFiles.length]);

  const activeFiles = openFiles.find((file) => file?.id === activeFileId);
  const hasUnsavedChanges = openFiles.some((file) => file?.hasUnsavedChanges);

  const handleFileSelect = (file: TemplateFile) => {
    openFile(file);
  };

  return (
    <TooltipProvider>
      <>
        {templateData && (
          <TemplateFileTree
            data={templateData}
            onFileSelect={handleFileSelect}
            selectedFile={activeFiles}
          />
        )}

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" />

            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-col flex-1">
                <h1 className="text-sm font-medium">
                  {playgroundData?.title || "Code Playground"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {openFiles.length} file(s) open
                  {hasUnsavedChanges && " • Unsaved changes"}
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => {}}
                    disabled={!activeFiles || !activeFiles.hasUnsavedChanges}
                  >
                    <SaveIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ctrl + S</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => {}}
                    disabled={!activeFiles || !activeFiles.hasUnsavedChanges}
                  >
                    <SaveAllIcon /> All
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ctrl + Shift + S</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => {}}
                    disabled={!activeFiles || !activeFiles.hasUnsavedChanges}
                  >
                    <BotMessageSquare />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ctrl + Shift + G</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                  >
                    {isPreviewVisible ? "Hide" : "Show"} Preview
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={closeAllFiles}>
                    Close All Files
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="h-[calc(100vh-4rem)]">
            {openFiles.length > 0 ? (
              <div className="h-full flex flex-col">
                {/* File Tabs */}
                <div className="border-b bg-muted/30">
                  <Tabs
                    value={activeFileId || ""}
                    onValueChange={setActiveFileId}
                  >
                    <div className="flex items-center justify-between px-4 py-1">
                      <TabsList className="h-7 gap-2 bg-gray-50 dark:bg-gray-900 p-0 border-b border-gray-100 dark:border-gray-800">
                        {openFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center relative group"
                          >
                            <TabsTrigger
                              value={file.id}
                              className="relative h-7 text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-gray-700 data-[state=active]:bg-gray-50 data-[state=active]:dark:bg-gray-700 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white data-[state=active]:border-gray-200 data-[state=active]:dark:border-gray-600 hover:bg-gray-50 hover:dark:bg-gray-750 transition-colors pr-8"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <FileText className="h-3 w-3 flex-shrink-0" />
                                <span className="max-w-[120px]">
                                  {file.filename}.{file.fileExtension}
                                </span>
                                {file.hasUnsavedChanges && (
                                  <span className="h-1.5 w-1.5 rounded-xs bg-gray-400 dark:bg-gray-500 data-[state=active]:bg-gray-600 data-[state=active]:dark:bg-gray-400 flex-shrink-0" />
                                )}
                              </div>
                            </TabsTrigger>
                            <button
                              className="absolute right-1 h-4 w-4 hover:bg-gray-100 hover:dark:bg-gray-700 data-[state=active]:hover:bg-gray-200 data-[state=active]:hover:dark:bg-gray-600 rounded-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                closeFile(file.id);
                              }}
                              aria-label={`Close ${file.filename}.${file.fileExtension}`}
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </div>
                        ))}
                      </TabsList>
                      {openFiles.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={closeAllFiles}
                          className="h-6 px-2 text-xs"
                        >
                          Close All
                        </Button>
                      )}
                    </div>
                  </Tabs>
                </div>

                {/* Editor here  */}
                {/* <div className="flex-1">
                  <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full"
                  >
                    <ResizablePanel defaultSize={isPreviewVisible ? 50 : 100}>
                      <PlaygroundEditor
                        activeFile={activeFile}
                        content={activeFile?.content || ""}
                        onContentChange={(value) =>
                          activeFileId && updateFileContent(activeFileId, value)
                        }
                        suggestion={aiSuggestions.suggestion}
                        suggestionLoading={aiSuggestions.isLoading}
                        suggestionPosition={aiSuggestions.position}
                        onAcceptSuggestion={(editor, monaco) =>
                          aiSuggestions.acceptSuggestion(editor, monaco)
                        }
                        onRejectSuggestion={(editor) =>
                          aiSuggestions.rejectSuggestion(editor)
                        }
                        onTriggerSuggestion={(type, editor) =>
                          aiSuggestions.fetchSuggestion(type, editor)
                        }
                      />
                    </ResizablePanel>

                    {isPreviewVisible && (
                      <>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={50}>
                          <WebContainerPreview
                            templateData={templateData}
                            instance={instance}
                            writeFileSync={writeFileSync}
                            isLoading={containerLoading}
                            error={containerError}
                            serverUrl={serverUrl!}
                            forceResetup={false}
                          />
                        </ResizablePanel>
                      </>
                    )}
                  </ResizablePanelGroup>
                </div> */}

                <PlaygroundEditor
                  activeFile={activeFiles}
                  content={activeFiles?.content || ""}
                  onContentChange={(value) =>
                    activeFileId && updateFileContent(activeFileId, value)
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col h-full items-center justify-center text-muted-foreground gap-4">
                <Image
                  src={"/getStartedCartoon.svg"}
                  height={500}
                  width={500}
                  alt="get-started"
                />
                <div className="text-center">
                  <p className="text-lg font-medium">No files open</p>
                  <p className="text-sm text-gray-500">
                    Select a file from the sidebar to start editing
                  </p>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </>
    </TooltipProvider>
  );
};

export default Page;
