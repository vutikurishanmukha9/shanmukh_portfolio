import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { SkillFilterProvider } from "@/context/SkillFilterContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ViewportEdgeFade } from "@/components/ViewportEdgeFade";
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
      {/* Ultra-Subtle Matte Texture (2% Film Grain) for physical anodized aluminum/fine paper finish */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[99] opacity-[0.02] dark:opacity-[0.035] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
      <ScrollProgress />
      <ViewportEdgeFade />
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
