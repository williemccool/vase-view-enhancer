
import { FileText, Sparkles, MapPin, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ReferenceDocumentsList from "./ReferenceDocumentsList";
import { EnhancedSampleDocument } from "@/types/documentTypes";

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

interface DocumentBuilderProps {
  selectedDocumentType: string;
  setSelectedDocumentType: (type: string) => void;
  selectedJurisdiction: string;
  setSelectedJurisdiction: (jurisdiction: string) => void;
  selectedFormattingProfile: string;
  setSelectedFormattingProfile: (profile: string) => void;
  specificRequirements: string;
  setSpecificRequirements: (requirements: string) => void;
  sampleDocuments: EnhancedSampleDocument[];
  selectedReferenceDocuments: string[];
  onSelectReferenceDoc: (docId: string) => void;
  onDeleteSampleDoc: (id: string) => void;
  onOpenUploadDialog: () => void;
  onGenerateDocument: () => void;
  isGenerating: boolean;
}

const DocumentBuilder = ({
  selectedDocumentType,
  setSelectedDocumentType,
  selectedJurisdiction,
  setSelectedJurisdiction,
  selectedFormattingProfile,
  setSelectedFormattingProfile,
  specificRequirements,
  setSpecificRequirements,
  sampleDocuments,
  selectedReferenceDocuments,
  onSelectReferenceDoc,
  onDeleteSampleDoc,
  onOpenUploadDialog,
  onGenerateDocument,
  isGenerating
}: DocumentBuilderProps) => {
  return (
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
          <ReferenceDocumentsList
            sampleDocuments={sampleDocuments}
            selectedReferenceDocuments={selectedReferenceDocuments}
            selectedDocumentType={selectedDocumentType}
            onSelectReferenceDoc={onSelectReferenceDoc}
            onDeleteSampleDoc={onDeleteSampleDoc}
            onOpenUploadDialog={onOpenUploadDialog}
          />
        )}

        {/* Generate Button */}
        <Button 
          onClick={onGenerateDocument} 
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
  );
};

export default DocumentBuilder;
