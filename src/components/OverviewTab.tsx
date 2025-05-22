
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewTab = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Documents</CardDescription>
            <CardTitle className="text-2xl">2</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hours Tracked</CardDescription>
            <CardTitle className="text-2xl">0</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-2xl">$0.00</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Invoices</CardDescription>
            <CardTitle className="text-2xl">0</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["yoyo", "Signing"].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                  <span>{doc}</span>
                  <span className="text-sm text-muted-foreground">May 19, 2025</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Case Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex flex-col space-y-1">
                <dt className="text-sm text-muted-foreground">Case ID</dt>
                <dd>123</dd>
              </div>
              <div className="flex flex-col space-y-1">
                <dt className="text-sm text-muted-foreground">Client</dt>
                <dd>chumma only</dd>
              </div>
              <div className="flex flex-col space-y-1">
                <dt className="text-sm text-muted-foreground">Created On</dt>
                <dd>May 19, 2025</dd>
              </div>
              <div className="flex flex-col space-y-1">
                <dt className="text-sm text-muted-foreground">Status</dt>
                <dd>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
