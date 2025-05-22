
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, FileText, CheckCircle2, Download, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { InvoiceGenerator } from "@/utils/invoiceGenerator";

// Helper function to convert PDF buffer to blob URL for viewing
const bufferToUrl = (buffer: Buffer) => {
  const blob = new Blob([buffer], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
};

const InvoicesTab = () => {
  const [invoices, setInvoices] = useState<Array<{
    id: string;
    date: string;
    dueDate: string;
    amount: string;
    status: "paid" | "pending" | "overdue";
  }>>([
    {
      id: "INV-001",
      date: "May 15, 2025",
      dueDate: "Jun 15, 2025",
      amount: "$1,250.00",
      status: "pending"
    },
    {
      id: "INV-002",
      date: "Apr 10, 2025",
      dueDate: "May 10, 2025",
      amount: "$850.00",
      status: "paid"
    }
  ]);

  const getStatusBadge = (status: "paid" | "pending" | "overdue") => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      default:
        return null;
    }
  };

  const addInvoice = () => {
    const newInvoice = {
      id: `INV-00${invoices.length + 1}`,
      date: "May 22, 2025",
      dueDate: "Jun 22, 2025",
      amount: "$0.00",
      status: "pending" as const
    };
    setInvoices([newInvoice, ...invoices]);
  };

  const generateInvoicePDF = async (invoiceId: string) => {
    try {
      // Mock data for demonstration
      const invoice = {
        invoice_number: invoiceId,
        issue_date: new Date().toISOString(),
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 1250.00,
        razorpay_payment_link: "https://pay.example.com/invoice123"
      };
      
      const expenses = [
        {
          description: "Client meeting transportation",
          on_date: "2025-05-20",
          amount: 45.00
        },
        {
          description: "Printing and document preparation",
          on_date: "2025-05-18", 
          amount: 32.50
        }
      ];
      
      const timeEntries = [
        {
          description: "Research and documentation review",
          on_date: "2025-05-22",
          hours: 1.5,
          rate: 250.00
        },
        {
          description: "Client meeting and follow-up",
          on_date: "2025-05-21",
          hours: 2.25,
          rate: 250.00
        }
      ];
      
      const userData = {
        name: "Jane Doe, Attorney at Law",
        email: "jane.doe@example.com"
      };
      
      const clientDetails = {
        name: "Smith Corporation",
        email_address: "smith@example.com",
        phone_number: "+1 555-123-4567"
      };
      
      const caseDetails = {
        case_number: "#123",
        case_title: "Smith v. Johnson"
      };
      
      // Generate the PDF
      const pdfBuffer = await InvoiceGenerator.generatePDF(
        invoice,
        expenses,
        timeEntries,
        userData,
        clientDetails,
        caseDetails
      );
      
      // Create a blob URL for the PDF
      const pdfUrl = bufferToUrl(pdfBuffer);
      
      // Open PDF in new tab
      window.open(pdfUrl, '_blank');
      
      toast({
        title: "Invoice Generated",
        description: `Invoice ${invoiceId} has been generated successfully.`,
        duration: 3000,
      });
      
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast({
        title: "Error",
        description: "Failed to generate invoice PDF. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border shadow-md">
          <CardHeader className="bg-gradient-to-r from-background to-muted/30 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Create New Invoice
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <form className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="invoiceDate" className="text-sm font-medium">Invoice Date</label>
                <Input 
                  type="date" 
                  id="invoiceDate" 
                  defaultValue="2025-05-22" 
                  className="shadow-sm focus-visible:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                <Input 
                  type="date" 
                  id="dueDate" 
                  defaultValue="2025-06-22" 
                  className="shadow-sm focus-visible:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="clientName" className="text-sm font-medium">Client</label>
                <Select defaultValue="client1">
                  <SelectTrigger className="shadow-sm focus:ring-primary">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">Smith Corporation</SelectItem>
                    <SelectItem value="client2">Johnson LLC</SelectItem>
                    <SelectItem value="client3">Williams & Associates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="invoiceNumber" className="text-sm font-medium">Invoice Number</label>
                <Input 
                  id="invoiceNumber" 
                  value="INV-003" 
                  disabled 
                  className="bg-muted/40"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="border rounded-md overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Description</TableHead>
                        <TableHead className="text-right w-[15%]">Hours</TableHead>
                        <TableHead className="text-right w-[15%]">Rate</TableHead>
                        <TableHead className="text-right w-[15%]">Amount</TableHead>
                        <TableHead className="w-[15%] text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="Item description" className="border-none" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="0" className="border-none text-right" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="0.00" className="border-none text-right" />
                        </TableCell>
                        <TableCell className="text-right font-medium">$0.00</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <tfoot>
                      <TableRow className="border-t">
                        <TableCell colSpan={2}>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            Add Item
                          </Button>
                        </TableCell>
                        <TableCell className="text-right font-medium">Total:</TableCell>
                        <TableCell className="text-right font-medium">$0.00</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </tfoot>
                  </Table>
                </div>
              </div>
              
              <div className="flex gap-2 md:col-span-2 justify-end">
                <Button variant="outline" className="shadow-sm">
                  Save Draft
                </Button>
                <Button 
                  type="submit" 
                  className="shadow-sm hover:shadow transition-all"
                >
                  Generate Invoice
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Invoice History</h2>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addInvoice} 
            className="flex items-center gap-1 shadow-sm hover:shadow transition-all"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="font-medium">{invoice.amount}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => generateInvoicePDF(invoice.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:inline-flex">View</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:inline-flex">Download</span>
                      </Button>
                      {invoice.status === "pending" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          <span className="sr-only md:not-sr-only md:inline-flex">Mark Paid</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {invoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    <FileText className="h-6 w-6 mx-auto mb-2" />
                    <p>No invoices created yet</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <div className="flex justify-end">
        <Card className="w-full md:w-64 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Invoiced</span>
              <span className="font-medium">$2,100.00</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Paid</span>
              </div>
              <span className="font-medium">$850.00</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Outstanding</span>
              <span className="font-medium">$1,250.00</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoicesTab;
