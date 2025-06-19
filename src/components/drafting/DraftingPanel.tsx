
import React from "react";
import { FileText, Upload, X } from "lucide-react";
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

// US States and Jurisdictions
const jurisdictions = [
  { value: "federal", label: "Federal" },
  { value: "alabama", label: "Alabama" },
  { value: "alaska", label: "Alaska" },
  { value: "arizona", label: "Arizona" },
  { value: "arkansas", label: "Arkansas" },
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "connecticut", label: "Connecticut" },
  { value: "delaware", label: "Delaware" },
  { value: "florida", label: "Florida" },
  { value: "georgia", label: "Georgia" },
  { value: "hawaii", label: "Hawaii" },
  { value: "idaho", label: "Idaho" },
  { value: "illinois", label: "Illinois" },
  { value: "indiana", label: "Indiana" },
  { value: "iowa", label: "Iowa" },
  { value: "kansas", label: "Kansas" },
  { value: "kentucky", label: "Kentucky" },
  { value: "louisiana", label: "Louisiana" },
  { value: "maine", label: "Maine" },
  { value: "maryland", label: "Maryland" },
  { value: "massachusetts", label: "Massachusetts" },
  { value: "michigan", label: "Michigan" },
  { value: "minnesota", label: "Minnesota" },
  { value: "mississippi", label: "Mississippi" },
  { value: "missouri", label: "Missouri" },
  { value: "montana", label: "Montana" },
  { value: "nebraska", label: "Nebraska" },
  { value: "nevada", label: "Nevada" },
  { value: "new-hampshire", label: "New Hampshire" },
  { value: "new-jersey", label: "New Jersey" },
  { value: "new-mexico", label: "New Mexico" },
  { value: "new-york", label: "New York" },
  { value: "north-carolina", label: "North Carolina" },
  { value: "north-dakota", label: "North Dakota" },
  { value: "ohio", label: "Ohio" },
  { value: "oklahoma", label: "Oklahoma" },
  { value: "oregon", label: "Oregon" },
  { value: "pennsylvania", label: "Pennsylvania" },
  { value: "rhode-island", label: "Rhode Island" },
  { value: "south-carolina", label: "South Carolina" },
  { value: "south-dakota", label: "South Dakota" },
  { value: "tennessee", label: "Tennessee" },
  { value: "texas", label: "Texas" },
  { value: "utah", label: "Utah" },
  { value: "vermont", label: "Vermont" },
  { value: "virginia", label: "Virginia" },
  { value: "washington", label: "Washington" },
  { value: "west-virginia", label: "West Virginia" },
  { value: "wisconsin", label: "Wisconsin" },
  { value: "wyoming", label: "Wyoming" },
  { value: "dc", label: "District of Columbia" },
];

// Formatting profiles
const formattingProfiles = [
  { value: "standard", label: "Standard Legal Format" },
  { value: "court-filing", label: "Court Filing Format" },
  { value: "contract", label: "Contract Format" },
  { value: "memo", label: "Legal Memorandum" },
  { value: "brief", label: "Legal Brief" },
  { value: "corporate", label: "Corporate Document" },
  { value: "simple", label: "Simple Format" },
];

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
  const [selectedFormattingProfile, setSelectedFormattingProfile] = React.useState("standard");
  const [referenceFiles, setReferenceFiles] = React.useState<File[]>([]);
  const [showOptionalFields, setShowOptionalFields] = React.useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setReferenceFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setReferenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 h-full border">
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white flex items-center">
        <FileText className="mr-2 h-5 w-5 text-blue-600 dark:text-purple-400" />
        Document Configuration
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Document Type
          </label>
          <Select
            value={documentType}
            onValueChange={setDocumentType}
            disabled={isProcessing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reference Document Section - Visible when document type is selected */}
        {documentType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Reference Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Upload reference documents
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  PDF, DOC, DOCX, TXT files
                </span>
              </label>
            </div>
            
            {referenceFiles.length > 0 && (
              <div className="space-y-2">
                {referenceFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-2 rounded"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                      {file.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={isProcessing}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            State/Jurisdiction
          </label>
          <Select
            value={selectedJurisdiction}
            onValueChange={setSelectedJurisdiction}
            disabled={isProcessing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {jurisdictions.map((jurisdiction) => (
                <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                  {jurisdiction.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Formatting Profile
          </label>
          <Select
            value={selectedFormattingProfile}
            onValueChange={setSelectedFormattingProfile}
            disabled={isProcessing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select formatting profile" />
            </SelectTrigger>
            <SelectContent>
              {formattingProfiles.map((profile) => (
                <SelectItem key={profile.value} value={profile.value}>
                  {profile.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Toggle for Optional Fields */}
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            disabled={isProcessing}
          >
            {showOptionalFields ? "Hide" : "Show"} Optional Fields
          </Button>
        </div>

        {/* Optional Fields Section */}
        {showOptionalFields && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 border-t pt-4"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Client Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter client name"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-background text-sm"
                disabled={isProcessing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Case Number (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter case number"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-background text-sm"
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Court/Agency (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter court or agency name"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-background text-sm"
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Due Date (Optional)
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-background text-sm"
                disabled={isProcessing}
              />
            </div>
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Specific Requirements
          </label>
          <Textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Enter specific details about your document requirements, relevant parties, key terms, etc..."
            rows={8}
            disabled={isProcessing}
          />
        </div>

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
          disabled={!documentType || !requirements || !selectedJurisdiction || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating Document...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate Document
            </>
          )}
        </Button>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
          This is AI-generated and may not fully reflect your intent. Please
          review and edit as needed.
        </p>
      </form>
    </div>
  );
};

export default DraftingPanel;
