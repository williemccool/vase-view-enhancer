
import React from "react";
import { Textarea } from "../ui/textarea";

interface RequirementsInputProps {
  requirements: string;
  setRequirements: (requirements: string) => void;
  isProcessing: boolean;
}

const RequirementsInput: React.FC<RequirementsInputProps> = ({
  requirements,
  setRequirements,
  isProcessing,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900 dark:text-slate-300">
        Your Requirements
      </label>
      <Textarea
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        placeholder="Describe your specific needs: parties involved, key terms, special clauses, deadlines, jurisdiction, etc. The more details you provide, the better your document will be."
        className="min-h-[140px] text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors resize-none"
        disabled={isProcessing}
      />
      <p className="text-xs text-gray-500 flex items-center gap-1">
        <span className="w-1 h-1 bg-gray-400 rounded-full" />
        Be as specific as possible for the best results
      </p>
    </div>
  );
};

export default RequirementsInput;
