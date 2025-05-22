
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CaseHeaderProps {
  title: string;
}

const CaseHeader = ({ title }: CaseHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header 
      className="flex items-center justify-between border-b bg-background p-4 sticky top-0 z-20 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="hover:bg-muted/80 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <motion.h1 
          className="text-lg font-semibold tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {title}
        </motion.h1>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            size="sm"
            className="gap-1.5 shadow-sm hover:shadow transition-all duration-150"
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="h-4 w-4 mr-2" />
            New Document
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="h-4 w-4 mr-2" />
            New Invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.header>
  );
};

export default CaseHeader;
