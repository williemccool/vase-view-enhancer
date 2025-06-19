
import { AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MaintenanceNotice = () => {
  return (
    <Alert className="border-amber-200 bg-amber-50 text-amber-800 mb-6">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-900 font-semibold">
        AI Services Maintenance Notice
      </AlertTitle>
      <AlertDescription className="mt-2">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">
              AI services will be temporarily unavailable for maintenance until Sunday, June 23rd at 11:59 PM.
            </p>
            <p className="mt-1 text-sm">
              We're upgrading our systems to provide you with better results and improved performance. 
              Thank you for your patience during this maintenance period.
            </p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default MaintenanceNotice;
