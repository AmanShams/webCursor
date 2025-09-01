"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddNewButton = () => {
  return (
    <div
      className="group px-4 py-3 flex flex-row items-center gap-3 border rounded-md bg-transparent 
        cursor-pointer transition-all duration-200 ease-in-out 
        hover:bg-muted hover:border-foreground/50"
    >
      <Button
        variant="outline"
        className="flex justify-center items-center bg-transparent border-foreground/30 
          group-hover:border-foreground/50 group-hover:text-foreground/80 
          transition-colors duration-200"
        size="icon"
      >
        <Plus
          size={20}
          className="transition-transform duration-200 group-hover:rotate-90"
        />
      </Button>
      <div className="flex flex-col">
        <h1 className="text-base font-semibold text-foreground">Add New</h1>
        <p className="text-xs text-muted-foreground max-w-[180px]">
          Create a new playground
        </p>
      </div>
    </div>
  );
};

export default AddNewButton;
