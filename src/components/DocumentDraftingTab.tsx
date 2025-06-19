
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import EnhancedUploadDialog from "./EnhancedUploadDialog";
import FormattingConfigModal from "./FormattingConfigModal";
import DocumentHero from "./drafting/DocumentHero";
import DocumentBuilder from "./drafting/DocumentBuilder";
import DocumentPreview from "./drafting/DocumentPreview";
import { EnhancedSampleDocument } from "@/types/documentTypes";
import { mockCases, mockClients } from "@/data/mockData";

interface GeneratedDocument {
  id: string;
  type: string;
  content: string;
  generatedDate: string;
}

const DocumentDraftingTab = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("");
  const [selectedFormattingProfile, setSelectedFormattingProfile] = useState<string>("");
  const [specificRequirements, setSpecificRequirements] = useState<string>("");
  const [selectedReferenceDocuments, setSelectedReferenceDocuments] = useState<string[]>([]);
  const [sampleDocuments, setSampleDocuments] = useState<EnhancedSampleDocument[]>([
    {
      id: "1",
      name: "Sample Legal Notice Template",
      originalFileName: "legal_notice_template.txt",
      type: "Legal Notice for Recovery of Money",
      content: "LEGAL NOTICE\n\nTo,\n[Debtor Name]\n[Debtor Address]\n\nDear Sir/Madam,\n\nMy client [Client Name] has instructed me to serve upon you this Legal Notice for the recovery of money...",
      uploadDate: "2025-01-15",
      caseId: "case-1",
      clientId: "client-1",
      caseName: "Property Dispute - ABC vs XYZ",
      clientName: "ABC Corporation"
    },
    {
      id: "2",
      name: "Employment Contract Template",
      originalFileName: "employment_contract.doc",
      type: "Employment Contract",
      content: "EMPLOYMENT AGREEMENT\n\nThis Employment Agreement is entered into between [Company Name] and [Employee Name]...",
      uploadDate: "2025-01-10",
      caseId: "case-2",
      clientId: "client-2",
      caseName: "Employment Contract Review",
      clientName: "John Smith"
    }
  ]);
  
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isFormattingModalOpen, setIsFormattingModalOpen] = useState(false);
  const { toast } = useToast();

  const handleEnhancedUpload = (document: EnhancedSampleDocument) => {
    setSampleDocuments(prev => [...prev, document]);
    toast({
      title: "Document uploaded successfully",
      description: `${document.name} has been added to your sample documents.`
    });
  };

  const handleSelectReferenceDoc = (docId: string) => {
    setSelectedReferenceDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleGenerateDocument = async () => {
    if (!selectedDocumentType || !specificRequirements.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a document type and provide specific requirements.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call for document generation
    setTimeout(() => {
      const selectedDocsText = selectedReferenceDocuments.length > 0 
        ? `\n\nUsing ${selectedReferenceDocuments.length} reference document(s) for improved accuracy.`
        : '';
      
      const jurisdictionText = selectedJurisdiction 
        ? `\n\nJurisdiction: ${selectedJurisdiction}`
        : '';
        
      const formattingText = selectedFormattingProfile 
        ? `\n\nFormatting: ${selectedFormattingProfile}`
        : '';
      
      const generated: GeneratedDocument = {
        id: Date.now().toString(),
        type: selectedDocumentType,
        content: `GENERATED ${selectedDocumentType.toUpperCase()}\n\nBased on your requirements: ${specificRequirements}${selectedDocsText}${jurisdictionText}${formattingText}\n\nThis is a generated document that would contain the specific legal content based on your requirements. The AI would analyze your requirements and generate appropriate legal language, clauses, and structure for the selected document type.\n\n[Document content would be generated here based on the specific requirements, selected sample documents, jurisdiction, and formatting preferences...]`,
        generatedDate: new Date().toISOString().split('T')[0]
      };
      setGeneratedDocument(generated);
      setIsGenerating(false);
      toast({
        title: "Document generated successfully",
        description: "Your legal document has been created. Please review and edit as needed."
      });
    }, 2000);
  };

  const handleDeleteSampleDoc = (id: string) => {
    setSampleDocuments(prev => prev.filter(doc => doc.id !== id));
    setSelectedReferenceDocuments(prev => prev.filter(docId => docId !== id));
    toast({
      title: "Document deleted",
      description: "Sample document has been removed."
    });
  };

  const handleSaveFormattingConfig = (config: any) => {
    // Save the formatting configuration
    toast({
      title: "Formatting configuration saved",
      description: `${config.name} has been saved successfully.`
    });
    setIsFormattingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <DocumentHero onOpenFormattingModal={() => setIsFormattingModalOpen(true)} />

      {/* Main Content */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Document Creation Section */}
          <div className="xl:col-span-3 space-y-8">
            <DocumentBuilder
              selectedDocumentType={selectedDocumentType}
              setSelectedDocumentType={setSelectedDocumentType}
              selectedJurisdiction={selectedJurisdiction}
              setSelectedJurisdiction={setSelectedJurisdiction}
              selectedFormattingProfile={selectedFormattingProfile}
              setSelectedFormattingProfile={setSelectedFormattingProfile}
              specificRequirements={specificRequirements}
              setSpecificRequirements={setSpecificRequirements}
              sampleDocuments={sampleDocuments}
              selectedReferenceDocuments={selectedReferenceDocuments}
              onSelectReferenceDoc={handleSelectReferenceDoc}
              onDeleteSampleDoc={handleDeleteSampleDoc}
              onOpenUploadDialog={() => setIsUploadDialogOpen(true)}
              onGenerateDocument={handleGenerateDocument}
              isGenerating={isGenerating}
            />
          </div>

          {/* Document Preview Section */}
          <div className="xl:col-span-2">
            <DocumentPreview generatedDocument={generatedDocument} />
          </div>
        </div>
      </div>

      <EnhancedUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleEnhancedUpload}
        documentType={selectedDocumentType}
        cases={mockCases}
        clients={mockClients}
      />

      <FormattingConfigModal
        isOpen={isFormattingModalOpen}
        onClose={() => setIsFormattingModalOpen(false)}
        onSave={handleSaveFormattingConfig}
        initialData={null}
      />
    </div>
  );
};

export default DocumentDraftingTab;
