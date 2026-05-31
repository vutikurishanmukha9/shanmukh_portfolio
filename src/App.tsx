import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { SkillFilterProvider } from "@/context/SkillFilterContext";
import { BackgroundCanvas } from "@/components/ui/background-canvas";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyUnicorn from "./pages/CaseStudyUnicorn";
import CaseStudyAdidas from "./pages/CaseStudyAdidas";
import CaseStudySalesReport from "./pages/CaseStudySalesReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SkillFilterProvider>
        <TooltipProvider>
          <BackgroundCanvas />
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/case-study/unicorn" element={<CaseStudyUnicorn />} />
              <Route path="/case-study/adidas" element={<CaseStudyAdidas />} />
              <Route path="/case-study/sales" element={<CaseStudySalesReport />} />
              <Route path="/case-study/sales-report" element={<CaseStudySalesReport />} /> {/* Redirect/alias for safety */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SkillFilterProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
