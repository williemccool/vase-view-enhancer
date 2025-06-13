
import { useState } from "react";
import { FileText, Upload, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface SampleDocument {
  id: string;
  name: string;
  type: string;
  content: string;
  uploadDate: string;
}

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
  const [sampleDocuments, setSampleDocuments] = useState<SampleDocument[]>([
    {
      id: "1",
      name: "Sample Legal Notice Template",
      type: "Legal Notice for Recovery of Money",
      content: "LEGAL NOTICE\n\nTo,\n[Debtor Name]\n[Debtor Address]\n\nDear Sir/Madam,\n\nMy client [Client Name] has instructed me to serve upon you this Legal Notice for the recovery of money...",
      uploadDate: "2025-01-15"
    },
    {
      id: "2",
      name: "Employment Contract Template",
      type: "Employment Contract",
      content: "EMPLOYMENT AGREEMENT\n\nThis Employment Agreement is entered into between [Company Name] and [Employee Name]...",
      uploadDate: "2025-01-10"
    }
  ]);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);
  const [selectedSampleDoc, setSelectedSampleDoc] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<SampleDocument | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newDocument: SampleDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: selectedDocumentType || "Unknown",
          content: content,
          uploadDate: new Date().toISOString().split('T')[0]
        };
        setSampleDocuments(prev => [...prev, newDocument]);
        toast({
          title: "Document uploaded successfully",
          description: `${file.name} has been added to your sample documents.`
        });
      };
      reader.readAsText(file);
    }
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
                <Label>Upload Sample Document (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a sample document for better results
                  </p>
                  <input
                    type="file"
                    accept=".txt,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>

                {filteredSampleDocs.length > 0 && (
                  <div className="space-y-2">
                    <Label>Previously Uploaded Samples</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filteredSampleDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="text-sm truncate">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
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
                                    <p className="text-sm text-muted-foreground">Type: {doc.type}</p>
                                    <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
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
                      ))}
                    </div>
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
    </div>
  );
};

export default DocumentDraftingTab;
