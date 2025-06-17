
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Pencil, Trash } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import FormattingConfigModal from "./FormattingConfigModal";

interface FormattingConfig {
  id: string;
  name: string;
  is_default: boolean;
  config: {
    font: {
      family: string;
      size: number;
      color: string;
    };
    spacing: {
      line_spacing: number;
      paragraph_spacing_after: number;
    };
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
      unit: string;
    };
    page_setup: {
      orientation: string;
      paper_size: string;
    };
    indentation: {
      first_line: number;
    };
    headers_footers: {
      include_page_numbers: boolean;
      page_number_position: string;
    };
  };
}

const FormattingPreferences = () => {
  const [configurations, setConfigurations] = useState<FormattingConfig[]>([
    {
      id: "1",
      name: "Standard Pleading Format",
      is_default: true,
      config: {
        font: { family: "Times New Roman", size: 12, color: "#000000" },
        spacing: { line_spacing: 2.0, paragraph_spacing_after: 6 },
        margins: { top: 1, bottom: 1, left: 1, right: 1, unit: "inches" },
        page_setup: { orientation: "Portrait", paper_size: "Letter" },
        indentation: { first_line: 0.5 },
        headers_footers: { include_page_numbers: true, page_number_position: "Bottom Center" }
      }
    },
    {
      id: "2", 
      name: "Brief Format",
      is_default: false,
      config: {
        font: { family: "Times New Roman", size: 11, color: "#000000" },
        spacing: { line_spacing: 1.5, paragraph_spacing_after: 12 },
        margins: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25, unit: "inches" },
        page_setup: { orientation: "Portrait", paper_size: "Letter" },
        indentation: { first_line: 0 },
        headers_footers: { include_page_numbers: true, page_number_position: "Bottom Right" }
      }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<FormattingConfig | null>(null);

  const handleCreateNew = () => {
    setEditingConfig(null);
    setIsModalOpen(true);
  };

  const handleEdit = (config: FormattingConfig) => {
    setEditingConfig(config);
    setIsModalOpen(true);
  };

  const handleSetDefault = (configId: string) => {
    setConfigurations(prev => 
      prev.map(config => ({
        ...config,
        is_default: config.id === configId
      }))
    );
  };

  const handleDelete = (configId: string) => {
    setConfigurations(prev => prev.filter(config => config.id !== configId));
  };

  const handleSave = (configData: Omit<FormattingConfig, 'id'>) => {
    if (editingConfig) {
      // Update existing
      setConfigurations(prev => 
        prev.map(config => 
          config.id === editingConfig.id 
            ? { ...configData, id: editingConfig.id }
            : { ...config, is_default: configData.is_default ? false : config.is_default }
        )
      );
    } else {
      // Create new
      const newConfig: FormattingConfig = {
        ...configData,
        id: Date.now().toString()
      };
      setConfigurations(prev => [
        ...prev.map(config => ({ ...config, is_default: configData.is_default ? false : config.is_default })),
        newConfig
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Formatting Preferences</h1>
        <Button onClick={handleCreateNew} className="gap-2">
          <span className="text-lg">+</span>
          Create New Profile
        </Button>
      </div>

      <div className="grid gap-4">
        {configurations.map((config, index) => (
          <motion.div
            key={config.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{config.name}</CardTitle>
                    {config.is_default && (
                      <Badge variant="default" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(config)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSetDefault(config.id)}
                      className={`h-8 w-8 ${config.is_default ? 'text-yellow-500' : ''}`}
                    >
                      <Star className={`h-4 w-4 ${config.is_default ? 'fill-current' : ''}`} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Configuration</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{config.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(config.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Font: {config.config.font.family} {config.config.font.size}pt</p>
                  <p>Line Spacing: {config.config.spacing.line_spacing}x</p>
                  <p>Margins: {config.config.margins.top}" {config.config.margins.unit}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <FormattingConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingConfig}
      />
    </div>
  );
};

export default FormattingPreferences;
