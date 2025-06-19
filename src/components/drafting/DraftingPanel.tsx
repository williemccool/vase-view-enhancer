
import React from "react";
import {
  FileText,
  Upload,
  X,
  Clock,
  Tag,
  Check,
  Eye,
  Trash2,
  Sparkles,
  MapPin,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import EnhancedUploadDialog from "../EnhancedUploadDialog";

import { EnhancedSampleDocument } from "@/types/documentTypes";
import { mockCases, mockClients } from "@/data/mockData";
import { jurisdictions } from "@/lib/constants";

interface DocumentType {
  value: string;
  label: string;
}

// Formatting profiles
const formattingProfiles = [
  { value: "standard", label: "Standard Legal Format" },
  { value: "high-court", label: "High Court Format" },
  { value: "supreme-court", label: "Supreme Court Format" },
  { value: "corporate", label: "Corporate Legal Format" },
  { value: "minimalist", label: "Minimalist Format" },
  { value: "traditional", label: "Traditional Format" },
];

interface DraftingPanelProps {
  documentTypes: DocumentType[];
  documentType: string;
  requirements: string;
  isProcessing: boolean;
  error: string | null;
  setDocumentType: (type: string) => void;
  setRequirements: (requirements: string) => void;
  onSubmit: () => void;
}

const DraftingPanel: React.FC<DraftingPanelProps> = ({
  documentTypes,
  documentType,
  requirements,
  isProcessing,
  error,
  setDocumentType,
  setRequirements,
  onSubmit,
}) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = React.useState("");
  const [selectedFormattingProfile, setSelectedFormattingProfile] =
    React.useState("standard");
  const [selectedReferenceDocuments, setSelectedReferenceDocuments] =
    React.useState<string[]>([]);
  const [sampleDocuments, setSampleDocuments] = React.useState<
    EnhancedSampleDocument[]
  >([
    {
      id: "1",
      name: "Sample Legal Notice Template",
      originalFileName: "legal_notice_template.txt",
      type: "Legal Notice for Recovery of Money",
      content:
        "LEGAL NOTICE\n\nTo,\n[Debtor Name]\n[Debtor Address]\n\nDear Sir/Madam,\n\nMy client [Client Name] has instructed me to serve upon you this Legal Notice for the recovery of money...",
      uploadDate: "2025-01-15",
      caseId: "case-1",
      clientId: "client-1",
      caseName: "Property Dispute - ABC vs XYZ",
      clientName: "ABC Corporation",
    },
    {
      id: "2",
      name: "Employment Contract Template",
      originalFileName: "employment_contract.doc",
      type: "Employment Contract",
      content:
        "EMPLOYMENT AGREEMENT\n\nThis Employment Agreement is entered into between [Company Name] and [Employee Name]...",
      uploadDate: "2025-01-10",
      caseId: "case-2",
      clientId: "client-2",
      caseName: "Employment Contract Review",
      clientName: "John Smith",
    },
  ]);
  const [previewDocument, setPreviewDocument] =
    React.useState<EnhancedSampleDocument | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);

  const handleEnhancedUpload = (document: EnhancedSampleDocument) => {
    setSampleDocuments((prev) => [...prev, document]);
  };

  const handleSelectReferenceDoc = (docId: string) => {
    setSelectedReferenceDocuments((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const handleDeleteSampleDoc = (id: string) => {
    setSampleDocuments((prev) => prev.filter((doc) => doc.id !== id));
    setSelectedReferenceDocuments((prev) =>
      prev.filter((docId) => docId !== id)
    );
  };

  const filteredSampleDocs = sampleDocuments.filter(
    (doc) => !documentType || doc.type === documentType
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 h-full border-0 bg-white/80 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        {/* Document Type Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Document Type
          </label>
          <Select
            value={documentType}
            onValueChange={setDocumentType}
            disabled={isProcessing}
          >
            <SelectTrigger className="w-full">
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

        {/* Optional Fields Grid */}
        <div className="space-y-5">
          {/* Jurisdiction Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900 dark:text-slate-300 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              State/Jurisdiction
              <Badge variant="outline" className="text-xs text-gray-500">
                Optional
              </Badge>
            </label>
            <Select
              value={selectedJurisdiction}
              onValueChange={setSelectedJurisdiction}
              disabled={isProcessing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select state or jurisdiction" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {jurisdictions.map((jurisdiction) => (
                  <SelectItem
                    key={jurisdiction.value}
                    value={jurisdiction.value}
                    className="py-2"
                  >
                    {jurisdiction.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Formatting Profile Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900 dark:text-slate-300 flex items-center gap-2">
              <Palette className="h-4 w-4 text-gray-600" />
              Formatting Profile
              <Badge variant="outline" className="text-xs text-gray-500">
                Optional
              </Badge>
            </label>
            <Select
              value={selectedFormattingProfile}
              onValueChange={setSelectedFormattingProfile}
              disabled={isProcessing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose formatting style" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {formattingProfiles.map((profile) => (
                  <SelectItem
                    key={profile.value}
                    value={profile.value}
                    className="py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      {profile.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Requirements Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-900 dark:text-slate-300">
            Your Requirements
          </label>
          <Textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Describe your specific needs: parties involved, key terms, special clauses, deadlines, jurisdiction, etc. The more details you provide, the better your document will be."
            className="min-h-[140px] text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors resize-none"
            disabled={isProcessing}
          />
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            Be as specific as possible for the best results
          </p>
        </div>

        {/* Sample Documents Section */}
        {documentType && (
          <div className="space-y-4 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Reference Documents
                </h3>
                <p className="text-sm text-gray-600">
                  Click to select documents that will help AI understand your
                  preferred style
                  {selectedReferenceDocuments.length > 0 && (
                    <span className="ml-2 text-blue-600 font-medium">
                      ({selectedReferenceDocuments.length} selected)
                    </span>
                  )}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadDialogOpen(true)}
                className="border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Reference
              </Button>
            </div>

            {filteredSampleDocs.length > 0 ? (
              <div className="grid gap-4">
                {filteredSampleDocs.map((doc) => {
                  const isSelected = selectedReferenceDocuments.includes(
                    doc.id
                  );
                  return (
                    <div
                      key={doc.id}
                      className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all group ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                      onClick={() => handleSelectReferenceDoc(doc.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`p-1.5 rounded-lg ${
                                isSelected ? "bg-blue-200" : "bg-blue-100"
                              }`}
                            >
                              <FileText
                                className={`h-4 w-4 ${
                                  isSelected ? "text-blue-700" : "text-blue-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`font-medium truncate ${
                                  isSelected ? "text-blue-900" : "text-gray-900"
                                }`}
                              >
                                {doc.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {doc.originalFileName}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="p-1 bg-blue-500 rounded-full">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>

                          {(doc.clientName || doc.caseName) && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {doc.clientName && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-100 text-green-700 hover:bg-green-200"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {doc.clientName}
                                </Badge>
                              )}
                              {doc.caseName && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-blue-200 text-blue-700"
                                >
                                  {doc.caseName}
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            Uploaded {doc.uploadDate}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-blue-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewDocument(doc);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[700px] sm:max-w-[700px]">
                              <SheetHeader>
                                <SheetTitle className="text-left">
                                  Document Preview
                                </SheetTitle>
                              </SheetHeader>
                              <div className="mt-6 space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                  <h4 className="font-semibold text-gray-900">
                                    {doc.name}
                                  </h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-500">
                                        Original file:
                                      </span>
                                      <p className="font-medium">
                                        {doc.originalFileName}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">
                                        Type:
                                      </span>
                                      <p className="font-medium">{doc.type}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">
                                        Uploaded:
                                      </span>
                                      <p className="font-medium">
                                        {doc.uploadDate}
                                      </p>
                                    </div>
                                    {doc.clientName && (
                                      <div>
                                        <span className="text-gray-500">
                                          Client:
                                        </span>
                                        <p className="font-medium">
                                          {doc.clientName}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-white">
                                  <pre className="text-sm whitespace-pre-wrap font-mono">
                                    {doc.content}
                                  </pre>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSampleDoc(doc.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  No reference documents yet
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Upload similar documents to help AI understand your preferred
                  style and format
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUploadDialogOpen(true)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Document
                </Button>
              </div>
            )}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-md"
          >
            {error}
          </motion.div>
        )}
        <Button
          type="submit"
          disabled={!documentType || !requirements || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating document...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate Document
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <span className="font-medium text-amber-700">
              ⚠️ AI Disclaimer:
            </span>{" "}
            This is AI-generated content and may not fully reflect your intent.
            Please review and edit as needed before use.
          </p>
        </div>
      </form>

      <EnhancedUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleEnhancedUpload}
        documentType={documentType}
        cases={mockCases}
        clients={mockClients}
      />
    </div>
  );
};

export default DraftingPanel;
