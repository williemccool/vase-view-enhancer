
import { useState } from "react";
import CaseHeader from "@/components/CaseHeader";
import CaseTabs from "@/components/CaseTabs";
import DocumentsTab from "@/components/DocumentsTab";
import OverviewTab from "@/components/OverviewTab";
import TimeTrackingTab from "@/components/TimeTrackingTab";
import ExpensesTab from "@/components/ExpensesTab";
import InvoicesTab from "@/components/InvoicesTab";

type Tab = "overview" | "documents" | "timeTracking" | "expenses" | "invoices";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "documents":
        return <DocumentsTab />;
      case "timeTracking":
        return <TimeTrackingTab />;
      case "expenses":
        return <ExpensesTab />;
      case "invoices":
        return <InvoicesTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CaseHeader title="chumma only - 123" />
      <CaseTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Index;
