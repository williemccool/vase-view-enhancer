
import { useState } from "react";
import { Search, Grid, List, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  name: string;
  lastModified: string;
}

const DocumentsTab = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "yoyo", lastModified: "May 19, 2025" },
    { id: "2", name: "Signing", lastModified: "May 19, 2025" },
  ]);
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="rounded-md border">
            <table className="w-full case-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-right">Last modified</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      {doc.name}
                    </td>
                    <td className="text-right text-muted-foreground">{doc.lastModified}</td>
                    <td className="text-right">
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-md p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.lastModified}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
          <div>Showing 1 to 2 of 2 documents</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;
