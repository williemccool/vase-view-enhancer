
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DocumentType {
  value: string;
  label: string;
}

interface DocumentTypeSelectorProps {
  documentTypes: DocumentType[];
  documentType: string;
  setDocumentType: (type: string) => void;
  isProcessing: boolean;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  documentTypes,
  documentType,
  setDocumentType,
  isProcessing,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Document Type
      </label>
      <Select
        value={documentType}
        onValueChange={setDocumentType}
        disabled={isProcessing}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Choose the type of document you need" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {documentTypes.map((type) => (
            <SelectItem
              key={type.value}
              value={type.value}
              className="py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                {type.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentTypeSelector;
