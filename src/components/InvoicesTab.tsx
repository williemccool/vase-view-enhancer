
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, FileText, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="invoiceDate" className="text-sm font-medium">Invoice Date</label>
              <Input type="date" id="invoiceDate" defaultValue="2025-05-22" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
              <Input type="date" id="dueDate" defaultValue="2025-06-22" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="clientName" className="text-sm font-medium">Client</label>
              <Input id="clientName" value="chumma only" disabled />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="invoiceNumber" className="text-sm font-medium">Invoice Number</label>
              <Input id="invoiceNumber" value="INV-003" disabled />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="border rounded-md">
                <table className="w-full case-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Hours</th>
                      <th className="text-right">Rate</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input placeholder="Item description" className="border-none" />
                      </td>
                      <td>
                        <Input type="number" placeholder="0" className="border-none text-right" />
                      </td>
                      <td>
                        <Input type="number" placeholder="0.00" className="border-none text-right" />
                      </td>
                      <td className="text-right font-medium">$0.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Plus className="h-4 w-4" />
                          Add Item
                        </Button>
                      </td>
                      <td className="text-right font-medium">Total:</td>
                      <td className="text-right font-medium">$0.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="flex gap-2 md:col-span-2 justify-end">
              <Button variant="outline">Save Draft</Button>
              <Button type="submit">Generate Invoice</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Invoice History</h2>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={addInvoice} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full case-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.date}</td>
                <td>{invoice.dueDate}</td>
                <td className="font-medium">{invoice.amount}</td>
                <td>{getStatusBadge(invoice.status)}</td>
                <td className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">View</Button>
                  {invoice.status === "pending" && (
                    <Button variant="ghost" size="sm" className="text-green-600">Mark Paid</Button>
                  )}
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">
                  <FileText className="h-6 w-6 mx-auto mb-2" />
                  <p>No invoices created yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Card className="w-full md:w-64">
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
