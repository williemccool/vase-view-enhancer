
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import { Case, Client, EnhancedSampleDocument } from "@/types/documentTypes";

interface EnhancedUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (document: EnhancedSampleDocument) => void;
  documentType: string;
  cases: Case[];
  clients: Client[];
}

const EnhancedUploadDialog = ({
  isOpen,
  onClose,
  onUpload,
  documentType,
  cases,
  clients
}: EnhancedUploadDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState<string>("none");
  const [selectedClientId, setSelectedClientId] = useState<string>("none");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!customName) {
        setCustomName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !customName.trim()) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const selectedCase = cases.find(c => c.id === selectedCaseId);
      const selectedClient = clients.find(c => c.id === selectedClientId);

      const newDocument: EnhancedSampleDocument = {
        id: Date.now().toString(),
        name: customName.trim(),
        originalFileName: selectedFile.name,
        type: documentType,
        content: content,
        uploadDate: new Date().toISOString().split('T')[0],
        caseId: selectedCaseId !== "none" ? selectedCaseId : undefined,
        clientId: selectedClientId !== "none" ? selectedClientId : undefined,
        caseName: selectedCase?.name,
        clientName: selectedClient?.name
      };

      onUpload(newDocument);
      handleClose();
    };
    reader.readAsText(selectedFile);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setCustomName("");
    setSelectedCaseId("none");
    setSelectedClientId("none");
    onClose();
  };

  const filteredCases = selectedClientId !== "none"
    ? cases.filter(case_ => case_.clientName === clients.find(c => c.id === selectedClientId)?.name)
    : cases;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Document Type</Label>
            <div className="mt-1">
              <Badge variant="outline">{documentType}</Badge>
            </div>
          </div>

          <div>
            <Label htmlFor="file-input">Select File</Label>
            <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
              {selectedFile ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{selectedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setSelectedFile(null);
                      setCustomName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <input
                    id="file-input"
                    type="file"
                    accept=".txt,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="file-input" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {selectedFile && (
            <>
              <div>
                <Label htmlFor="custom-name">Document Name</Label>
                <Input
                  id="custom-name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter custom name for this document"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Associate with Client (Optional)</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No client</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Associate with Case (Optional)</Label>
                <Select 
                  value={selectedCaseId} 
                  onValueChange={setSelectedCaseId}
                  disabled={selectedClientId === "none"}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={selectedClientId !== "none" ? "Select a case" : "Select a client first"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No case</SelectItem>
                    {filteredCases.map((case_) => (
                      <SelectItem key={case_.id} value={case_.id}>
                        <div className="flex flex-col">
                          <span>{case_.name}</span>
                          <span className="text-xs text-muted-foreground">Status: {case_.status}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={!customName.trim()}
                >
                  Upload Document
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedUploadDialog;
