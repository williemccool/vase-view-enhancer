
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    const variants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 }
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-auto"
        >
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "documents" && <DocumentsTab />}
          {activeTab === "timeTracking" && <TimeTrackingTab />}
          {activeTab === "expenses" && <ExpensesTab />}
          {activeTab === "invoices" && <InvoicesTab />}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CaseHeader title="Smith v. Johnson - #123" />
      <CaseTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {mounted && renderTabContent()}
    </div>
  );
};

export default Index;
