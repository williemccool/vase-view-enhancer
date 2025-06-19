
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

interface DocumentHeroProps {
  onOpenFormattingModal: () => void;
}

const DocumentHero = ({ onOpenFormattingModal }: DocumentHeroProps) => {
  return (
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
            onClick={onOpenFormattingModal}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Add Formatting Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentHero;
