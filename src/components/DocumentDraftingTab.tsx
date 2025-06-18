
import { useState } from "react";
import { FileText, Eye, Download, Trash2, Upload, Sparkles, Clock, Tag, Settings, Check, MapPin, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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

const jurisdictions = [
  "Andhra Pradesh",
  "Arunachal Pradesh", 
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep"
];

const formattingProfiles = [
  "Standard Legal Format",
  "High Court Format",
  "Supreme Court Format",
  "Corporate Legal Format",
  "Minimalist Format",
  "Traditional Format"
];

const DocumentDraftingTab = () => {
  const navigate = useNavigate();
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

  const filteredSampleDocs = sampleDocuments.filter(doc => 
    !selectedDocumentType || doc.type === selectedDocumentType
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Compact Hero Section */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">AI Drafting</h1>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                Powered by Lawberry AI
              </Badge>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/formatting')}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Add Formatting Configuration
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Document Creation Section */}
          <div className="xl:col-span-3 space-y-8">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  Document Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Document Type Selection */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-gray-900">Document Type</Label>
                  <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                    <SelectTrigger className="h-14 text-base border-2 border-gray-200 hover:border-blue-300 transition-colors">
                      <SelectValue placeholder="Choose the type of document you need" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type} className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            {type}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Optional Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Jurisdiction Selection */}
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      State/Jurisdiction
                      <Badge variant="outline" className="text-xs text-gray-500">Optional</Badge>
                    </Label>
                    <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                      <SelectTrigger className="h-12 text-base border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <SelectValue placeholder="Select state or jurisdiction" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {jurisdictions.map((jurisdiction) => (
                          <SelectItem key={jurisdiction} value={jurisdiction} className="py-2">
                            {jurisdiction}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Formatting Profile Selection */}
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-gray-600" />
                      Formatting Profile
                      <Badge variant="outline" className="text-xs text-gray-500">Optional</Badge>
                    </Label>
                    <Select value={selectedFormattingProfile} onValueChange={setSelectedFormattingProfile}>
                      <SelectTrigger className="h-12 text-base border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <SelectValue placeholder="Choose formatting style" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {formattingProfiles.map((profile) => (
                          <SelectItem key={profile} value={profile} className="py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-purple-500 rounded-full" />
                              {profile}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Requirements Input */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-gray-900">Your Requirements</Label>
                  <Textarea
                    value={specificRequirements}
                    onChange={(e) => setSpecificRequirements(e.target.value)}
                    placeholder="Describe your specific needs: parties involved, key terms, special clauses, deadlines, jurisdiction, etc. The more details you provide, the better your document will be."
                    className="min-h-[140px] text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors resize-none"
                  />
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    Be as specific as possible for the best results
                  </p>
                </div>

                {/* Sample Documents Section */}
                {selectedDocumentType && (
                  <div className="space-y-4 p-6 bg-gray-50 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Reference Documents</h3>
                        <p className="text-sm text-gray-600">
                          Click to select documents that will help AI understand your preferred style
                          {selectedReferenceDocuments.length > 0 && (
                            <span className="ml-2 text-blue-600 font-medium">
                              ({selectedReferenceDocuments.length} selected)
                            </span>
                          )}
                        </p>
                      </div>
                      <Button 
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
                          const isSelected = selectedReferenceDocuments.includes(doc.id);
                          return (
                            <div 
                              key={doc.id} 
                              className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all group ${
                                isSelected 
                                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                              }`}
                              onClick={() => handleSelectReferenceDoc(doc.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-200' : 'bg-blue-100'}`}>
                                      <FileText className={`h-4 w-4 ${isSelected ? 'text-blue-700' : 'text-blue-600'}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className={`font-medium truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                        {doc.name}
                                      </h4>
                                      <p className="text-xs text-gray-500">{doc.originalFileName}</p>
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
                                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                                          <Tag className="w-3 h-3 mr-1" />
                                          {doc.clientName}
                                        </Badge>
                                      )}
                                      {doc.caseName && (
                                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
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
                                        <SheetTitle className="text-left">Document Preview</SheetTitle>
                                      </SheetHeader>
                                      <div className="mt-6 space-y-6">
                                        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                          <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                                          <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                              <span className="text-gray-500">Original file:</span>
                                              <p className="font-medium">{doc.originalFileName}</p>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Type:</span>
                                              <p className="font-medium">{doc.type}</p>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Uploaded:</span>
                                              <p className="font-medium">{doc.uploadDate}</p>
                                            </div>
                                            {doc.clientName && (
                                              <div>
                                                <span className="text-gray-500">Client:</span>
                                                <p className="font-medium">{doc.clientName}</p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-white">
                                          <pre className="text-sm whitespace-pre-wrap font-mono">{doc.content}</pre>
                                        </div>
                                      </div>
                                    </SheetContent>
                                  </Sheet>
                                  <Button
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
                        <h4 className="font-medium text-gray-900 mb-2">No reference documents yet</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Upload similar documents to help AI understand your preferred style and format
                        </p>
                        <Button 
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

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerateDocument} 
                  disabled={isGenerating || !selectedDocumentType || !specificRequirements.trim()}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Your Document...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Document with AI
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <span className="font-medium text-amber-700">⚠️ AI Disclaimer:</span> This is AI-generated content and may not fully reflect your intent. Please review and edit as needed before use.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Preview Section */}
          <div className="xl:col-span-2">
            <div className="sticky top-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm min-h-[600px]">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedDocument ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div>
                          <h3 className="font-semibold text-green-900">{generatedDocument.type}</h3>
                          <p className="text-sm text-green-700 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            Generated on {generatedDocument.generatedDate}
                          </p>
                        </div>
                        <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="border-2 border-gray-200 rounded-xl p-6 max-h-[400px] overflow-y-auto bg-gray-50">
                        <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">{generatedDocument.content}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
                      <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
                        <FileText className="h-12 w-12 text-blue-600 mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Create?</h3>
                      <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
                        Complete the form to generate your professional legal document. Your preview will appear here instantly.
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span>Choose document type</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span>Describe your requirements</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span>Generate with AI</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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
    </div>
  );
};

export default DocumentDraftingTab;
