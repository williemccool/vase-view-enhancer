import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Users, AlertTriangle } from "lucide-react";

const Terms = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('terms-accepted', 'true');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground">Please read and accept our terms to continue</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Legal Practice Management Software Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 pr-4">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    1. Acceptance of Terms
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using this legal practice management software, you accept and agree to be bound by the terms and provision of this agreement. This software is designed specifically for legal professionals and law firms to manage their practice operations.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">2. Service Description</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Our platform provides comprehensive case management, document generation, time tracking, billing, and client communication tools designed specifically for legal practices. Features include:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Case and client management</li>
                    <li>Document drafting and generation</li>
                    <li>Time tracking and billing</li>
                    <li>Expense management</li>
                    <li>Voice dictation and transcription</li>
                    <li>Document translation services</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    3. User Responsibilities
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    As a user of this legal practice management system, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Use the service in compliance with all applicable laws and regulations</li>
                    <li>Ensure all client data is handled in accordance with attorney-client privilege</li>
                    <li>Not share access to confidential client information with unauthorized parties</li>
                    <li>Report any security breaches or unauthorized access immediately</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">4. Data Privacy and Security</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures to protect your data and maintain client confidentiality. All data is encrypted in transit and at rest. We comply with legal industry standards for data protection and will never share your confidential information without your explicit consent or as required by law.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">5. Professional Compliance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Users are responsible for ensuring their use of this software complies with their local bar association rules, professional conduct standards, and legal practice regulations. This includes maintaining client confidentiality and secure handling of privileged communications.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">6. Billing and Payment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Subscription fees are billed according to your selected plan. All fees are non-refundable unless otherwise stated. We reserve the right to modify pricing with 30 days advance notice to existing subscribers.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    7. Limitation of Liability
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    While we strive to provide reliable service, this software is provided "as is" without warranties. We are not liable for any damages arising from the use of this service. Legal professionals remain fully responsible for their professional obligations and compliance with applicable laws.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">8. Termination</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Either party may terminate this agreement at any time. Upon termination, you will have 30 days to export your data before it is permanently deleted from our systems.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">9. Updates to Terms</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or in-app notification.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">10. Contact Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these terms or our service, please contact our support team at support@legalpm.com or through the in-app help system.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="accept-terms" 
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
              />
              <label 
                htmlFor="accept-terms" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the Terms and Conditions
              </label>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={handleAccept}
                disabled={!accepted}
                className="flex-1"
              >
                Accept and Continue
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;