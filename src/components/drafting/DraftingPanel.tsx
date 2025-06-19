
import React from "react";
import { EnhancedSampleDocument } from "@/types/documentTypes";
import DocumentTypeSelector from "./DocumentTypeSelector";
import RequirementsInput from "./RequirementsInput";
import ReferenceDocumentsSection from "./ReferenceDocumentsSection";
import GenerateButton from "./GenerateButton";

interface DocumentType {
  value: string;
  label: string;
}

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
  const [selectedReferenceDocuments, setSelectedReferenceDocuments] =
    React.useState<string[]>([]);
  const [sampleDocuments, setSampleDocuments] = React.useState<EnhancedSampleDocument[]>([
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
  const [previewDocument, setPreviewDocument] = React.useState<EnhancedSampleDocument | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 h-full border-0 bg-white/80 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        <DocumentTypeSelector
          documentTypes={documentTypes}
          documentType={documentType}
          setDocumentType={setDocumentType}
          isProcessing={isProcessing}
        />

        <RequirementsInput
          requirements={requirements}
          setRequirements={setRequirements}
          isProcessing={isProcessing}
        />

        <ReferenceDocumentsSection
          documentType={documentType}
          sampleDocuments={sampleDocuments}
          setSampleDocuments={setSampleDocuments}
          selectedReferenceDocuments={selectedReferenceDocuments}
          setSelectedReferenceDocuments={setSelectedReferenceDocuments}
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
          previewDocument={previewDocument}
          setPreviewDocument={setPreviewDocument}
        />

        <GenerateButton
          documentType={documentType}
          requirements={requirements}
          isProcessing={isProcessing}
          error={error}
          onSubmit={onSubmit}
        />
      </form>
    </div>
  );
};

export default DraftingPanel;
