
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="border-b sticky top-[61px] z-10 bg-background shadow-sm">
      <nav className="flex overflow-x-auto px-4 md:px-6 max-w-screen-2xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative py-3 px-4 text-sm font-medium transition-colors focus-visible:outline-none",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CaseTabs;
