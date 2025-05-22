
import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "overview" | "documents" | "timeTracking" | "expenses" | "invoices";

interface CaseTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const CaseTabs = ({ activeTab, onTabChange }: CaseTabsProps) => {
  const tabs = [
    { id: "overview" as Tab, label: "Overview" },
    { id: "documents" as Tab, label: "Documents" },
    { id: "timeTracking" as Tab, label: "Time tracking" },
    { id: "expenses" as Tab, label: "Expenses" },
    { id: "invoices" as Tab, label: "Invoices" },
  ];

  return (
    <div className="border-b bg-muted/20">
      <nav className="flex overflow-x-auto px-4 md:px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "tab-button",
              activeTab === tab.id && "active"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CaseTabs;
