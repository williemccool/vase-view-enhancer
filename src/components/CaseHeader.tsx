
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseHeaderProps {
  title: string;
}

const CaseHeader = ({ title }: CaseHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b bg-background p-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      
      <Button variant="default">New document</Button>
    </header>
  );
};

export default CaseHeader;
