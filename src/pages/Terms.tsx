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
          <p className="text-muted-foreground">Please read and accept our terms to continue using Lawberry.ai</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Lawberry.ai Terms and Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 pr-4">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Introduction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to Lawberry.ai, a product of the Lawberry Labs ("Service Provider", "Us", "Our"). 
                    For the purposes of these Terms and Conditions, "Lawberry" refers to the website 
                    (lawberry.ai) and the services provided by Lawberry Labs("Service"). By using Lawberry.ai 
                    ("Service") you agree to be bound by the following terms and conditions ("Terms"). Please 
                    read them carefully before using our Service. You and Service Provider are hereinafter 
                    referred to individually as the Party and collectively as the Parties.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Acceptance Of Terms</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using Service Provider, you agree to comply with and be bound by these 
                    Terms. If you do not agree to these Terms, you may not access or use the Service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Modification To Terms</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider reserves the exclusive right to modify these Terms at any time. Any 
                    changes will be effective immediately upon posting the revised Terms on our website. Your 
                    continued use of the Service after any such changes constitutes your acceptance of the new 
                    Terms.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Eligibility</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You must be at least 18 years old to use Service. By using Service Provider, you represent 
                    and warrant that you are at least 18 years of age. Service Provider hereby disclaims all 
                    responsibility of unauthorized access of Service by individuals who are lesser than 18 years 
                    of age.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Account Registration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To access the Service, you need to register an account. You hereby warrant, to provide 
                    accurate and complete information during the registration process and to make the best 
                    reasonable efforts to keep your account information up-to-date. You are the sole Party 
                    responsible for maintaining the confidentiality and integrity of your account credentials and 
                    for all activities that occur under your account upon using Service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Prohibition of Usage
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You are only permitted to use the Service for lawful purposes and in compliance with the 
                    terms. By using the Service, You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>Violate any applicable national and international laws or regulations in any manner.</li>
                    <li>Exploit, harm, or attempt to exploit or harm minors by exposing them to inappropriate content or similar actions.</li>
                    <li>Impersonate or make an attempt to impersonate Service Provider, Service Provider's representatives, affiliates, employees, another user of Service, or any other individual or entity.</li>
                    <li>Engage in actions that infringe upon the rights of others, or that are illegal, threatening, fraudulent, or harmful.</li>
                    <li>Partake in any conduct that restricts or inhibits the Service Provider and another user of Service from using or enjoying the Service.</li>
                    <li>Use the Service in a way that could disable, overload, damage, or impair the Service or interfere with the ability of other parties to engage in real-time activities through the Service.</li>
                    <li>Employ any automated tools, like robots, spiders, viruses, malwares, worms and trojans to access the Service.</li>
                    <li>Use manual processes to monitor or copy materials on the Service or for any other unauthorized purpose without obtaining our prior written consent.</li>
                    <li>Utilize any devices, software, computer programs, prompts, tokens, or routines that disrupt the proper functioning of the Service.</li>
                    <li>Introduce any viruses, trojan horses, worms, logic bombs, or other malicious or technologically harmful materials.</li>
                    <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any part of the Service.</li>
                    <li>Launch an attack on the Service through a denial-of-Services or distributed denial-of-Services attack.</li>
                    <li>Use the Service for illegal purposes or for the transmission of material that is unlawful, harassing, libelous, invasive of another's privacy, abusive, threatening, obscene or that infringes the rights or intellectual property of others.</li>
                    <li>Rent, lease, loan, sublicense, distribute, or otherwise transfer rights to the Service.</li>
                    <li>Engage in any data harvesting, including but not limited to, automated data scraping, mining, or extracting, from Service Provider.</li>
                    <li>Take actions that could damage or manipulate the Company's ratings or damage its reputation.</li>
                    <li>Make any other attempts to interfere with the proper functioning of the Service.</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    User Consent Clause
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By submitting your case information to Service Provider, you explicitly consent to Service 
                    Provider accessing your court records available publicly for the purpose of providing and 
                    improving our services. You acknowledge and agree that the information accessed from 
                    public court records will be used in accordance with our Privacy Policy and Terms and 
                    Conditions. This includes, but is not limited to, sourcing data from eCourts, the Hon'ble 
                    Supreme Court of India, various High Courts and Tribunals of India, and other public legal 
                    records.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    The information provided by Service Provider is sourced from public court records, including 
                    but not limited to the eCourts and other government hosted websites. Users are advised to 
                    verify the accuracy of the data directly with the respective courts or through official records. 
                    The data provided by Service Provider is not intended for use as legal evidence and should 
                    not be relied upon as such.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Service Provider is not responsible for any data inaccuracy or delay in the updation of any 
                    data on Service Provider. We do not accept any responsibility or liability for any damage or 
                    loss arising from the direct or indirect use of the information provided by Service Provider.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider also utilizes data from publicly available third-party websites. We strive to 
                    ensure that the data we collect from third-party sources is accurate and current. However, we 
                    do not guarantee the accuracy, completeness, or reliability of any information obtained from 
                    third-party websites.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">AI & Safe Usage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider employs artificial intelligence to enhance legal information providing and 
                    decision support. We are committed to the ethical and safe use of AI. Our AI systems are 
                    designed to respect user privacy, operate transparently, and be free from biases. We 
                    continually monitor and update our AI models to ensure they provide accurate and fair 
                    information. Please be aware that the knowledge base of these AI models is current as of 
                    June 2025.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Data Security</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We implement appropriate technical and organizational measures to protect Your Personal 
                    Data against unauthorized access, alteration, disclosure, or destruction. These measures 
                    include:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Regular security assessments and audits</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Role based access</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Intellectual Property Rights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All rights, title, and interest in and to the Intellectual Property, including but not limited to 
                    any copyrightable works, ideas, expressions, and information contained therein, are owned by 
                    Service Provider Labs and are protected by copyright, patent and trademark laws. You are not 
                    permitted to use the Intellectual Property including the Service Provider logo without the 
                    express prior written consent of Service Provider.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Beta Disclaimer & Good Faith Usage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider is currently in beta and is provided to users in good faith. The platform is 
                    being tested and may not function as intended. By using the Service, you acknowledge and 
                    agree that the Service is in beta, you accept any risks associated with its use, and you 
                    understand that the platform may contain bugs, limited functionality, or other issues that 
                    could affect its performance.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Governing Law & Jurisdiction</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    The relationship between You and Service Provider shall be governed by the laws of India, 
                    without regard to conflict of law principles. Courts in Bengaluru, Karnataka shall have 
                    exclusive jurisdiction over all issues arising out of these Terms or the use of Service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    In the event of any disputes, You shall first attempt to write to us at admin@lawberry.com 
                    so as to resolve such disputes amicably. Any dispute not resolved within 90 working days 
                    shall be finally settled by arbitration in accordance with the Arbitration and Conciliation Act, 
                    1996, with the seat and venue of arbitration being Bengaluru, Karnataka.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Limitation Of Liability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To the fullest extent permitted by law, Service Provider Labs shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, or any loss of profits or 
                    revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
                    intangible losses, resulting from your access to or use of or inability to access or use the 
                    Service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these terms or our service, please contact us at admin@lawberry.com 
                    or through our support system.
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