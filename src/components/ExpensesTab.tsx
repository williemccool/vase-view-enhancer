
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Plus, Receipt } from "lucide-react";
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
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input type="date" id="date" defaultValue="2025-05-22" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select defaultValue="travel">
                <SelectTrigger>
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
                <Input id="amount" placeholder="0.00" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="receipt" className="text-sm font-medium">Receipt (Optional)</label>
              <Input id="receipt" type="file" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" placeholder="Describe the expense..." className="resize-none h-20" />
            </div>
            
            <Button type="submit" className="md:col-span-2 w-full md:w-auto md:self-end">Save Expense</Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Expense History</h2>
        <Button variant="outline" size="sm" onClick={addExpense} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Manually
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full case-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th className="text-right">Amount</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td className="text-right font-medium">{expense.amount}</td>
                <td className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  <Receipt className="h-6 w-6 mx-auto mb-2" />
                  <p>No expenses recorded</p>
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
              <span className="text-sm text-muted-foreground">Total Expenses</span>
              <span className="font-medium">$77.50</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Reimbursable</span>
              <span className="font-medium">$45.00</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Billable Total</span>
              <span className="font-medium">$77.50</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesTab;
