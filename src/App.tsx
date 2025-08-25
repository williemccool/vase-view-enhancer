
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dictation from "./pages/Dictation";
import TranslateDocument from "./pages/TranslateDocument";
import Terms from "./pages/Terms";
import BareActsSearch from "./pages/BareActsSearch";
import FormattingPreferences from "./components/FormattingPreferences";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dictation" element={<Dictation />} />
          <Route path="/translate" element={<TranslateDocument />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/bare-acts" element={<BareActsSearch />} />
          <Route path="/formatting" element={<FormattingPreferences />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
