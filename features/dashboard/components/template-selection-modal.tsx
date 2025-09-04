"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Search,
  Star,
  Code,
  Server,
  Globe,
  Zap,
  Clock,
  Check,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Templates } from "@prisma/client";
import { templates } from "@/data/templates";

type TemplateSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: Templates;
    description?: string;
  }) => void;
};

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");
  const [projectName, setProjectName] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      category === "all" || template.category === category;

    return matchSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setStep("configure");
    }
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={10}
          className={
            i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  const handleBack = () => {
    setStep("select");
  };

  const handleCreateProject = () => {
    if (selectedTemplate) {
      const templateMap: Record<string, Templates> = {
        react: "REACTJS",
        nextjs: "NEXTJS",
        express: "EXPRESS",
        vue: "VUE",
        hono: "HONO",
        angular: "ANGULAR",
      };

      const template = templates.find((t) => t.id === selectedTemplate);
      onSubmit({
        title: projectName || `New ${template?.name} Project`,
        template: templateMap[selectedTemplate] || "REACT",
        description: template?.description,
      });

      console.log(
        `Creating ${projectName || "new project"} with template: ${
          template?.name
        }`
      );
      onClose();
      // Reset state for next time
      setStep("select");
      setSelectedTemplate(null);
      setProjectName("");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setStep("select");
          setSelectedTemplate(null);
          setProjectName("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] min-h-[80vh] overflow-y-auto p-4">
        {step === "select" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Plus size={18} className="text-foreground/80" />
                Select a Template
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Choose a template to create your new playground
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-start justify-start h-full flex-col gap-4 py-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 text-xs"
                  />
                </div>

                <Tabs
                  defaultValue="all"
                  className="w-full sm:w-auto"
                  onValueChange={(value) =>
                    setCategory(
                      value as "all" | "frontend" | "backend" | "fullstack"
                    )
                  }
                >
                  <TabsList className="grid grid-cols-4 w-full sm:w-[300px] h-8">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="frontend" className="text-xs">
                      Frontend
                    </TabsTrigger>
                    <TabsTrigger value="backend" className="text-xs">
                      Backend
                    </TabsTrigger>
                    <TabsTrigger value="fullstack" className="text-xs">
                      Fullstack
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <RadioGroup
                value={selectedTemplate || ""}
                onValueChange={handleSelectTemplate}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`relative flex p-3 border rounded-md cursor-pointer
          transition-all duration-200 hover:scale-[1.01]
          ${
            selectedTemplate === template.id
              ? "border-foreground/50"
              : "hover:border-foreground/30"
          }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="absolute top-2 right-2 flex gap-0.5">
                          {renderStars(template.popularity)}
                        </div>

                        {selectedTemplate === template.id && (
                          <div className="absolute top-1.5 left-1.5 bg-foreground/80 text-background rounded-full p-0.5">
                            <Check size={10} />
                          </div>
                        )}

                        <div className="flex gap-2">
                          <div
                            className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full"
                            style={{ backgroundColor: `${template.color}10` }}
                          >
                            <Image
                              src={template.icon || "/placeholder.svg"}
                              alt={`${template.name} icon`}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <h3 className="text-sm font-semibold text-foreground">
                                {template.name}
                              </h3>
                              <div className="flex gap-0.5">
                                {template.category === "frontend" && (
                                  <Code
                                    size={10}
                                    className="text-foreground/80"
                                  />
                                )}
                                {template.category === "backend" && (
                                  <Server
                                    size={10}
                                    className="text-foreground/80"
                                  />
                                )}
                                {template.category === "fullstack" && (
                                  <Globe
                                    size={10}
                                    className="text-foreground/80"
                                  />
                                )}
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                              {template.description}
                            </p>

                            <div className="flex flex-wrap gap-0.5">
                              {template.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1 py-0.5 border rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <RadioGroupItem
                          value={template.id}
                          id={template.id}
                          className="sr-only"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center p-4 text-center">
                      <Search
                        size={24}
                        className="text-muted-foreground mb-2"
                      />
                      <h3 className="text-sm font-medium text-foreground">
                        No templates found
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between gap-2 mt-3 pt-3 border-t">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock size={12} className="mr-1" />
                <span>
                  Estimated setup time:{" "}
                  {selectedTemplate ? "2-5 minutes" : "Select a template"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="text-xs px-3 py-1"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-foreground/80 hover:bg-foreground/90 text-background px-3 py-1 text-xs"
                  disabled={!selectedTemplate}
                  onClick={handleContinue}
                >
                  Continue <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-foreground">
                Configure Your Project
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {templates.find((t) => t.id === selectedTemplate)?.name} project
                configuration
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="project-name" className="text-xs">
                  Project Name
                </Label>
                <Input
                  id="project-name"
                  placeholder="my-project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="p-3 border rounded-md">
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Selected Template Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {templates
                    .find((t) => t.id === selectedTemplate)
                    ?.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Zap size={12} className="text-foreground/80" />
                        <span className="text-xs text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-3 pt-3 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                className="text-xs px-3 py-1"
              >
                Back
              </Button>
              <Button
                className="bg-foreground/80 hover:bg-foreground/90 text-background px-3 py-1 text-xs"
                onClick={handleCreateProject}
              >
                Create Project
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
