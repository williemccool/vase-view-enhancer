
import { useState } from "react";
import { FileText, Eye, Trash2, Upload, Check, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EnhancedSampleDocument } from "@/types/documentTypes";

interface ReferenceDocumentsListProps {
  sampleDocuments: EnhancedSampleDocument[];
  selectedReferenceDocuments: string[];
  selectedDocumentType: string;
  onSelectReferenceDoc: (docId: string) => void;
  onDeleteSampleDoc: (id: string) => void;
  onOpenUploadDialog: () => void;
}

const ReferenceDocumentsList = ({
  sampleDocuments,
  selectedReferenceDocuments,
  selectedDocumentType,
  onSelectReferenceDoc,
  onDeleteSampleDoc,
  onOpenUploadDialog
}: ReferenceDocumentsListProps) => {
  const [previewDocument, setPreviewDocument] = useState<EnhancedSampleDocument | null>(null);

  const filteredSampleDocs = sampleDocuments.filter(doc => 
    !selectedDocumentType || doc.type === selectedDocumentType
  );

  return (
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
          onClick={onOpenUploadDialog}
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
                onClick={() => onSelectReferenceDoc(doc.id)}
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
                        onDeleteSampleDoc(doc.id);
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
            onClick={onOpenUploadDialog}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload First Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReferenceDocumentsList;
