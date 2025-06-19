
import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface GenerateButtonProps {
  documentType: string;
  requirements: string;
  isProcessing: boolean;
  error: string | null;
  onSubmit: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  documentType,
  requirements,
  isProcessing,
  error,
  onSubmit,
}) => {
  return (
    <div className="space-y-4">
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
        disabled={!documentType || !requirements || isProcessing}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100"
        onClick={onSubmit}
      >
        {isProcessing ? (
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
        <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <span className="font-medium text-amber-700">⚠️ AI Disclaimer:</span>{" "}
          This is AI-generated content and may not fully reflect your intent.
          Please review and edit as needed before use.
        </p>
      </div>
    </div>
  );
};

export default GenerateButton;
