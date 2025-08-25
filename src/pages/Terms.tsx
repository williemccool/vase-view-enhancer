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
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>Violate any applicable national and international laws or regulations in any manner.</li>
                    <li>Exploit, harm, or attempt to exploit or harm minors by exposing them to inappropriate content or similar actions.</li>
                    <li>Impersonate or make an attempt to impersonate Service Provider, Service Provider's representatives, affiliates, employees, another user of Service, or any other individual or entity.</li>
                    <li>Engage in actions that infringe upon the rights of others, or that are illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purposes or activities.</li>
                    <li>Partake in any conduct that restricts or inhibits the Service Provider and another user of Service from using or enjoying the Service, or that, as determined by us, may harm or offend the Service Provider or another user of Service or expose them to liability.</li>
                    <li>Use the Service in a way that could disable, overload, damage, or impair the Service or interfere with the ability of other parties to engage in real-time activities through the Service.</li>
                    <li>Employ any automated tools, like robots, spiders, viruses, malwares, worms and trojans to access the Service or use any means to achieve unauthorized access to the Service for any purpose, including monitoring or copying materials on the Service.</li>
                    <li>Use manual processes to monitor or copy materials on the Service or for any other unauthorized purpose without obtaining our prior written consent.</li>
                    <li>Utilize any devices, software, computer programs, prompts, tokens, or routines that disrupt the proper functioning of the Service.</li>
                    <li>Introduce any viruses, trojan horses, worms, logic bombs, or other malicious or technologically harmful materials.</li>
                    <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any part of the Service, the server on which the Service is hosted, or any server, computer, or database connected to the Service.</li>
                    <li>Launch an attack on the Service through a denial-of-Services or distributed denial-ofServices attack.</li>
                    <li>Use the Service for illegal purposes or for the transmission of material that is unlawful, harassing, libelous, invasive of another's privacy, abusive, threatening, obscene or that infringes the rights or intellectual property of others.</li>
                    <li>Rent, lease, loan, sublicense, distribute, or otherwise transfer rights to the Service.</li>
                    <li>Engage in any data harvesting, including but not limited to, automated data scraping, mining, or extracting, from Service Provider.</li>
                    <li>Take actions that could damage or manipulate the Company's ratings or damage its reputation.</li>
                    <li>Make any other attempts to interfere with the proper functioning of the Service.</li>
                  </ol>
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
                    loss arising from the direct or indirect use of the information provided by Service Provider. If
                    any errors or omissions are found, we would appreciate them being brought to our notice so
                    that corrections can be made.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Service Provider also utilizes data from publicly available third-party websites. By using
                    Service Provider, you acknowledge and agree to the following:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li><strong>Data Accuracy:</strong> We strive to ensure that the data we collect from third-party sources is accurate and current. However, we do not guarantee the accuracy, completeness, or reliability of any information obtained from third-party websites.</li>
                    <li><strong>No Endorsement:</strong> The inclusion of data from third-party websites does not imply any endorsement or association with those websites.</li>
                    <li><strong>Compliance with Third-Party Terms:</strong> You agree to comply with the terms of use and privacy policies of any third-party websites from which Service Provider sources data. We are not responsible for any breaches of such terms by our users.</li>
                    <li><strong>Limitations of Liability:</strong> Service Provider shall not be liable for any inaccuracies or issues arising from the use of data obtained from third-party websites. Your use of such data is at your own risk.</li>
                    <li><strong>Intellectual Property:</strong> We respect the intellectual property rights of others. If you believe that any data sourced from third-party websites and used by Service Provider infringes on your intellectual property rights, please notify us immediately.</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Use Of The Service</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You agree to use Service Provider only for lawful purposes and in accordance with these
                    Terms. You may not use the Service:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>In any way that violates any applicable local, state, national, and international law or regulation.</li>
                    <li>To engage in any activity that is harmful, fraudulent, deceptive, or otherwise objectionable.</li>
                    <li>To infringe on the rights of others, including intellectual property rights and privacy rights.</li>
                    <li>To transmit any material that is defamatory, obscene, offensive, or otherwise inappropriate.</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Data Usage & Research</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Service Provider utilizes publicly available legal data for research purposes to provide
                    accurate and up-to-date legal information. We are committed to ensuring that our data usage
                    complies with all applicable laws and regulations. The data we gather is processed and
                    analysed using advanced AI techniques to offer insights and recommendations to our users.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Please be aware that the knowledge base of these AI models is current as of June 2025.
                    While the AI can assist with a wide range of queries, it may not have information on
                    developments or changes in laws, regulations, or other relevant areas that have occurred
                    after this date. Users are advised to consult up-to-date sources and qualified professionals
                    for the most current information and advice.
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
                    information.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Use Of Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We use the collected information for various purposes, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>To provide and maintain Our Service</li>
                    <li>To notify You about changes to Our Service</li>
                    <li>To allow You to participate in interactive features of Our Service</li>
                    <li>To provide customer support</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We do not aggregate, share, or commercially exploit Your Personal Data in any way.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Sharing of Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We may share Your Personal Data in the following situations:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 text-sm">
                    <li><strong>With Service Providers:</strong> We may share Your information with third-party service providers who perform/provide services on Our behalf, such as hosting, data analysis, and customer service.</li>
                    <li><strong>For Legal Reasons:</strong> We may disclose Your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                    <li><strong>Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of firm assets, financing, or acquisition of all or a portion of Our business to another entity.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
                    We may disclose the Personal Data to various entities who may also come under the
                    definition of data processors as per The Digital Personal Data Protection Act, 2023, including
                    but not limited to, third party vendors, hosting service providers, cloud computing entities, IT
                    service firms, marketing and advertising agencies, web analytics companies. These entities
                    may access, process and store Personal Data as per the agreement entered with them. The
                    following is an updated list of key entities who are data processors and are engaged by Us:
                  </p>
                  <ul className="list-decimal list-inside text-muted-foreground space-y-1 ml-4 text-sm mt-2">
                    <li>Microsoft Azure (Microsoft Corporation)</li>
                    <li>Payment Gateways</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
                    Third-Parties may store, process, analyse, or otherwise access Your Personal Data and/or
                    User data as per their privacy policy and their terms and conditions. We recommend that
                    Our Users review the Third-Party's privacy policy and terms of use before engaging with Our
                    Services.
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
                  <h3 className="text-lg font-semibold mb-3">Licensing Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Users are granted a limited license to access and use Service solely for personal, noncommercial purposes. Any unauthorized use of Service Provider's trademarks, logos, and
                    other intellectual property is prohibited.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Copyright Infringement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If you believe any content on Service Provider infringes your copyright, please notify us with
                    the necessary details, and we will investigate and take appropriate action.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">External Links</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider may contain links to third-party websites. We are not responsible for the
                    content or practices of these sites, and users should review the terms and privacy policies of
                    any third-party sites they visit.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Termination of Accounts</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider reserves the right to suspend or terminate user accounts for any violations
                    of these Terms. Users may also terminate their accounts by contacting customer support.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Governing Law & Jurisdiction</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    The relationship between You and Service Provider shall be governed by the laws of India,
                    without regard to conflict of law principles. Subject to other provisions in this Clause, courts
                    in Bengaluru, Karnataka shall have exclusive jurisdiction over all issues arising out of these
                    Terms or the use of Service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    In the event of any disputes or differences arising under these Terms, You shall first attempt
                    to write to us at admin@lawberry.com so as to resolve such disputes and differences
                    amicably and through mutual discussions and negotiations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Any dispute, controversy, or claim arising out of or relating to or in connection with the
                    breach, termination or validity of these Terms or in relation to use of Service, which are not
                    resolved through mutual discussions within 90 working days from the date of receipt of
                    notice by us as provided for above, shall be finally settled by an arbitration tribunal which
                    shall consist of one (1) arbitrator chosen by Service Provider in accordance with the
                    Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Bengaluru,
                    Karnataka. The proceedings of the arbitration will be in English. And, the expense of the
                    arbitration will be borne by the respective parties. In case of any dispute, the decision of the
                    arbitrator will be final.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Modifications & Interruptions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider reserves the right to modify or discontinue any part of the Service at any
                    time. Users will be notified of significant changes via email or through the platform.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Disclaimer Of Warranties</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Service is provided on an "as is" and "as available" basis. We make no representations
                    or warranties of any kind, express or implied, as to the operation of the Service or the
                    information, content, or materials included in the Service. You expressly agree that your use
                    of the Service is at your sole risk.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Limitation Of Liability</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    To the fullest extent permitted by law, Service Provider Labs shall not be liable for any
                    indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
                    revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other
                    intangible losses, resulting from:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Your access to or use of or inability to access or use the Service;</li>
                    <li>Any conduct or content of any third party on the Service;</li>
                    <li>Any content obtained from the Service;</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Intellectual Property Rights</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Intellectual Property means and includes the Service Provider which includes the Services
                    available on it, the software code of Service Provider, the design, structure, selection and
                    feel and arrangement of the content of Service Provider and the trademarks, logos and
                    Services marks displayed on the Service Provider. All rights, title, and interest in and to the
                    Intellectual Property, including but not limited to any copyrightable works, ideas,
                    expressions, and information contained therein, are owned by Service Provider Labs. and
                    are protected by copyright, patent and trademark laws and other various Intellectual Property
                    rights either in the favor of Service Provider., or third parties from whom the appropriate
                    permissions have been taken under applicable laws.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You are not permitted to use the Intellectual Property including the Service Provider logo without the
                    express prior written consent of Service Provider. You are prohibited from selling any content on Service Provider
                    created and/or disseminated by us.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Infringements</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider shall have the right, in its sole discretion, to prosecute lawsuits against
                    third parties for infringement of Service Provider's rights over its Services.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Indemnification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify, defend, and hold harmless Lawberry Labs, its affiliates, and their
                    respective officers, directors, employees, and agents from and against any and all claims,
                    liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees)
                    arising from your use of the Service or your violation of these Terms.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Lawyer Information & Due Diligence</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Lawyers providing their details to Service Provider for due diligence purposes agree that
                    their information may be used to conduct searches and analyze their data on publicly
                    available platforms. We will not publish any data of lawyers on our website without first
                    seeking their explicit consent. Explicit consent will be obtained through a clear and
                    affirmative action, such as a checkbox or digital signature, during the data submission
                    process.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Service Provider is designed to facilitate legal research, case management, and
                    provide valuable insights to legal professionals through the use of advanced AI techniques
                    and publicly available legal data. We are not engaged in solicitation or advertising of lawyers
                    in compliance with the Advocates Act 1961 and Bar Council of India Rules.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Service Provider is not responsible for any advice or assistance provided by the lawyers
                    listed on our platform. We are an independent third-party platform enabling clients to
                    communicate with and, if needed, meet lawyers. We have no control over the services 
                    provided by the lawyers and are not responsible for any issues or discrepancies in the
                    services provided.
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
                    could affect its performance. We do not guarantee that the Service will be free from errors or
                    that it will meet your expectations.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Accuracy Of Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The information provided on Service Provider is for general informational purposes only and
                    does not constitute legal advice. While we strive to ensure that the information provided is
                    accurate and up-to-date, we make no representations or warranties of any kind, express or
                    implied, about the accuracy, reliability, or completeness of any information on the Service.
                    You should consult a qualified attorney for specific legal advice tailored to your
                    circumstances.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Effective Date & Termination</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These Terms take effect on the date you first use the Service in any form. The agreement
                    and associated licenses will end immediately without notice if you (or anyone using your
                    account) violate these Terms or any other rules that may be established by Service Provider
                    over time.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We reserve the right to suspend or terminate your registration for any reason, including
                    extended periods of inactivity, and will attempt to provide prior notice of such suspension or
                    termination. Upon termination, you agree to delete all Service Provider materials in your
                    possession and stop using the Service. Service Provider may remove any information, files,
                    or other content related to your account. We are not liable to you or any third party for the
                    termination of your access to the Site and/or Service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Each provision of these Terms operates independently. If any provision is found invalid or
                    unenforceable, the remaining provisions will continue in effect. Any invalid or unenforceable
                    provision will be modified to the minimum extent necessary to make it enforceable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Service Provider's failure to enforce any right or provision of these Terms does not constitute
                    a waiver of such right or provision. By using this Site and/or registering for the Site or
                    Service, you agree to these Terms and consent to enter into agreements with us
                    electronically.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You accept and assume all risks associated with the limitations outlined in these Terms by
                    using Service Provider. No promises or guarantees are made regarding the outcome of any
                    consultation or the resolution of any specific issue. If you do not agree to these Terms of Use or our Privacy Policy, please do not use Service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Waiver</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No waiver or failure to enforce any provision of these Terms shall in any way be construed to
                    be a present or future waiver of such provision nor affect our ability to enforce any provision
                    thereafter.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Severability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If, for any reason, a court of competent jurisdiction finds any provision of the Terms, or any
                    portion thereof, to be unenforceable, that provision shall be enforced to the maximum extent
                    permissible so as to give effect to the intent of the parties as reflected by that provision, and
                    the remainder of the Terms shall continue in full force and effect.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Assignment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You cannot assign or otherwise transfer these Terms, or any rights granted hereunder to any
                    third party without mutual written agreement. Our rights under these Terms are freely
                    transferable by us to any third party without the requirement of seeking Your consent.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">Independent Contractors</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By engaging with us, You understand that neither Service Provider nor You can bind each
                    other into a contract and both the parties act as independent contractors.
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