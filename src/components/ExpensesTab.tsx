
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Plus, Receipt, Upload } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExpensesTab = () => {
  const [expenses, setExpenses] = useState<Array<{
    id: number;
    date: string;
    category: string;
    description: string;
    amount: string;
  }>>([
    {
      id: 1,
      date: "May 20, 2025",
      category: "Travel",
      description: "Client meeting transportation",
      amount: "$45.00"
    },
    {
      id: 2,
      date: "May 18, 2025",
      category: "Office Supplies",
      description: "Printing and document preparation",
      amount: "$32.50"
    }
  ]);

  const addExpense = () => {
    const newExpense = {
      id: expenses.length + 1,
      date: "May 22, 2025",
      category: "Other",
      description: "New expense",
      amount: "$0.00"
    };
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-background to-muted/30 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-2">
            <form className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input type="date" id="date" defaultValue="2025-05-22" className="shadow-sm focus-visible:ring-primary" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select defaultValue="travel">
                  <SelectTrigger className="shadow-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="office">Office Supplies</SelectItem>
                    <SelectItem value="meals">Meals & Entertainment</SelectItem>
                    <SelectItem value="filing">Filing Fees</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="amount" placeholder="0.00" className="pl-10 shadow-sm focus-visible:ring-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="receipt" className="text-sm font-medium">Receipt (Optional)</label>
                <div className="relative">
                  <Input id="receipt" type="file" className="shadow-sm focus-visible:ring-primary" />
                  <Upload className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea id="description" placeholder="Describe the expense..." className="resize-none h-20 shadow-sm focus-visible:ring-primary" />
              </div>
              
              <Button 
                type="submit" 
                className="md:col-span-2 w-full md:w-auto md:self-end shadow hover:shadow-md transition-all"
              >
                Save Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Expense History</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addExpense} 
          className="flex items-center gap-1 shadow-sm hover:shadow transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Manually
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border shadow-sm overflow-hidden"
      >
        <table className="w-full case-table">
          <thead>
            <tr>
              <th className="bg-muted/40">Date</th>
              <th className="bg-muted/40">Category</th>
              <th className="bg-muted/40">Description</th>
              <th className="text-right bg-muted/40">Amount</th>
              <th className="text-right bg-muted/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <motion.tr 
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-muted/20"
              >
                <td>{expense.date}</td>
                <td>
                  <span className="inline-flex items-center rounded-full bg-muted/50 px-2 py-1 text-xs font-medium">
                    {expense.category}
                  </span>
                </td>
                <td>{expense.description}</td>
                <td className="text-right font-medium font-mono">{expense.amount}</td>
                <td className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                  >
                    Edit
                  </Button>
                </td>
              </motion.tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-muted-foreground">
                  <Receipt className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No expenses recorded</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      <div className="flex justify-end">
        <Card className="w-full md:w-64 shadow-md bg-muted/10 backdrop-blur-sm border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Expenses</span>
              <span className="font-medium font-mono">$77.50</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Reimbursable</span>
              <span className="font-medium font-mono">$45.00</span>
            </div>
            <div className="flex items-center justify-between pt-3 mt-2 border-t">
              <span className="font-medium">Billable Total</span>
              <span className="font-bold font-mono text-primary">$77.50</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesTab;
