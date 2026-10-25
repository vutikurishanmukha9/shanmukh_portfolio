import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { SkillFilterProvider } from "@/context/SkillFilterContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import Index from "./pages/Index";
import ProductDesigner from "./pages/ProductDesigner";
import NotFound from "./pages/NotFound";
import CaseStudyUnicorn from "./pages/CaseStudyUnicorn";
import CaseStudyAdidas from "./pages/CaseStudyAdidas";
import CaseStudySalesReport from "./pages/CaseStudySalesReport";
import ProjectContextLy from "./pages/ProjectContextLy";

const queryClient = new QueryClient();

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ScrollProgress />
      <Toaster />
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SkillFilterProvider>
        <SmoothScrollProvider>
          <TooltipProvider>
            <BrowserRouter>
              <LayoutWrapper>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/design" element={<ProductDesigner />} />
                  <Route path="/product-design" element={<ProductDesigner />} />
                  <Route path="/case-study/unicorn" element={<CaseStudyUnicorn />} />
                  <Route path="/case-study/adidas" element={<CaseStudyAdidas />} />
                  <Route path="/case-study/sales" element={<CaseStudySalesReport />} />
                  <Route path="/case-study/sales-report" element={<CaseStudySalesReport />} />
                  <Route path="/project/contextly" element={<ProjectContextLy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </LayoutWrapper>
            </BrowserRouter>
          </TooltipProvider>
        </SmoothScrollProvider>
      </SkillFilterProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
