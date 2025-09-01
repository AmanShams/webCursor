import React from "react";
import { FolderSearch } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <FolderSearch size={40} />
      <h2 className="text-xl font-semibold text-gray-500">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
