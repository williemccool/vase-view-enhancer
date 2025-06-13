
import { useState } from "react";
import { FileText, Eye, Download, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import EnhancedUploadDialog from "./EnhancedUploadDialog";
import { EnhancedSampleDocument } from "@/types/documentTypes";
import { mockCases, mockClients } from "@/data/mockData";

interface GeneratedDocument {
  id: string;
  type: string;
  content: string;
  generatedDate: string;
}

const documentTypes = [
  "Legal Notice for Recovery of Money",
  "Anticipatory Bail Petition",
  "Gift Deed for Property",
  "Public Charitable Trust Deed",
  "Employment Contract",
  "Non-Disclosure Agreement",
  "Partnership Agreement",
  "Rental Agreement"
];

const DocumentDraftingTab = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");
  const [specificRequirements, setSpecificRequirements] = useState<string>("");
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
  const [previewDocument, setPreviewDocument] = useState<EnhancedSampleDocument | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEnhancedUpload = (document: EnhancedSampleDocument) => {
    setSampleDocuments(prev => [...prev, document]);
    toast({
      title: "Document uploaded successfully",
      description: `${document.name} has been added to your sample documents.`
    });
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
      const generated: GeneratedDocument = {
        id: Date.now().toString(),
        type: selectedDocumentType,
        content: `GENERATED ${selectedDocumentType.toUpperCase()}\n\nBased on your requirements: ${specificRequirements}\n\nThis is a generated document that would contain the specific legal content based on your requirements. The AI would analyze your requirements and generate appropriate legal language, clauses, and structure for the selected document type.\n\n[Document content would be generated here based on the specific requirements and selected sample documents...]`,
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
    toast({
      title: "Document deleted",
      description: "Sample document has been removed."
    });
  };

  const filteredSampleDocs = sampleDocuments.filter(doc => 
    !selectedDocumentType || doc.type === selectedDocumentType
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="document-type">Document Type</Label>
              <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                value={specificRequirements}
                onChange={(e) => setSpecificRequirements(e.target.value)}
                placeholder="Enter specific details about your document requirements, relevant parties, key terms, etc..."
                className="min-h-[120px]"
              />
            </div>

            {selectedDocumentType && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Sample Documents</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                </div>

                {filteredSampleDocs.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredSampleDocs.map((doc) => (
                      <div key={doc.id} className="border rounded p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              <span className="font-medium text-sm truncate">{doc.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Original: {doc.originalFileName}
                            </p>
                            {(doc.clientName || doc.caseName) && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {doc.clientName && (
                                  <Badge variant="secondary" className="text-xs">
                                    Client: {doc.clientName}
                                  </Badge>
                                )}
                                {doc.caseName && (
                                  <Badge variant="outline" className="text-xs">
                                    Case: {doc.caseName}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => setPreviewDocument(doc)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="w-[600px] sm:max-w-[600px]">
                                <SheetHeader>
                                  <SheetTitle>Document Preview</SheetTitle>
                                </SheetHeader>
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-sm text-muted-foreground">Original: {doc.originalFileName}</p>
                                    <p className="text-sm text-muted-foreground">Type: {doc.type}</p>
                                    <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                                    {doc.clientName && (
                                      <p className="text-sm text-muted-foreground">Client: {doc.clientName}</p>
                                    )}
                                    {doc.caseName && (
                                      <p className="text-sm text-muted-foreground">Case: {doc.caseName}</p>
                                    )}
                                  </div>
                                  <div className="border rounded p-4 max-h-96 overflow-y-auto">
                                    <pre className="text-sm whitespace-pre-wrap">{doc.content}</pre>
                                  </div>
                                </div>
                              </SheetContent>
                            </Sheet>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteSampleDoc(doc.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      No sample documents for this type
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsUploadDialogOpen(true)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload First Document
                    </Button>
                  </div>
                )}
              </div>
            )}

            <Button 
              onClick={handleGenerateDocument} 
              className="w-full"
              disabled={isGenerating || !selectedDocumentType || !specificRequirements.trim()}
            >
              {isGenerating ? "Generating Document..." : "Generate Document"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              This is AI-generated and may not fully reflect your intent. Please review and edit as needed.
            </p>
          </CardContent>
        </Card>

        {/* Document Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedDocument ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{generatedDocument.type}</p>
                    <p className="text-sm text-muted-foreground">
                      Generated on {generatedDocument.generatedDate}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="border rounded p-4 max-h-96 overflow-y-auto bg-muted/50">
                  <pre className="text-sm whitespace-pre-wrap">{generatedDocument.content}</pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="rounded-full bg-blue-100 p-4 mb-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Document Generated Yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Fill out the form on the left with your document type and specific requirements, 
                  then click "Generate Document" to create your legal document.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>You can generate documents like:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Legal Notice for Recovery of Money</li>
                    <li>Anticipatory Bail Petition</li>
                    <li>Gift Deed for Property</li>
                    <li>Public Charitable Trust Deed</li>
                    <li>And many more...</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EnhancedUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleEnhancedUpload}
        documentType={selectedDocumentType}
        cases={mockCases}
        clients={mockClients}
      />
    </div>
  );
};

export default DocumentDraftingTab;
