import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

interface TermsAcceptanceModalProps {
  open?: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const TermsAcceptanceModal = ({ open, onAccept, onDecline }: TermsAcceptanceModalProps) => {
  const [accepted, setAccepted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open === undefined) {
      // Auto-show if terms haven't been accepted
      const termsAccepted = localStorage.getItem('terms-accepted');
      setIsOpen(!termsAccepted);
    } else {
      setIsOpen(open);
    }
  }, [open]);

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('terms-accepted', 'true');
      setIsOpen(false);
      onAccept();
    }
  };

  const handleDecline = () => {
    setIsOpen(false);
    onDecline();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Terms and Conditions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Before using our legal practice management software, please review and accept our terms and conditions.
          </p>

          <div className="border rounded-lg p-4">
            <ScrollArea className="h-48">
              <div className="space-y-3 text-sm">
                <p className="font-medium">Key Terms Summary:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>This software is designed for legal professionals</li>
                  <li>You must maintain client confidentiality and attorney-client privilege</li>
                  <li>All data is encrypted and secure</li>
                  <li>You remain responsible for professional compliance</li>
                  <li>Service is provided "as is" with professional limitations</li>
                  <li>Either party may terminate with 30 days data export period</li>
                </ul>
                
                <p className="text-xs text-muted-foreground mt-4">
                  <Link to="/terms" className="text-primary hover:underline">
                    Read full terms and conditions →
                  </Link>
                </p>
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="modal-accept-terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label 
              htmlFor="modal-accept-terms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the Terms and Conditions
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleAccept}
              disabled={!accepted}
              className="flex-1"
            >
              Accept and Continue
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDecline}
              className="flex-1"
            >
              Decline
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAcceptanceModal;