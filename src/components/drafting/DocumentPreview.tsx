
import { FileText, Clock, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GeneratedDocument {
  id: string;
  type: string;
  content: string;
  generatedDate: string;
}

interface DocumentPreviewProps {
  generatedDocument: GeneratedDocument | null;
}

const DocumentPreview = ({ generatedDocument }: DocumentPreviewProps) => {
  return (
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
  );
};

export default DocumentPreview;
