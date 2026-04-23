
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from 'react-helmet-async';

import Index from "./pages/Index";
import Vision from "./pages/Vision";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OpenSource from "./pages/OpenSource";
import ReleaseLogs from "./pages/ReleaseLogs";
import NotFound from "./pages/NotFound";
import Anvira from "./pages/Anvira";
import AnviraO1 from "./pages/AnviraO1";
import AnviraO1E from "./pages/AnviraO1E";
import AnviraH1 from "./pages/AnviraH1";
import DevQuill from "./pages/DevQuill";
import InkFlow from "./pages/InkFlow";
import Nomi from "./pages/Nomi";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/anvira" element={<Anvira />} />
              <Route path="/anvira/o1" element={<AnviraO1 />} />
              <Route path="/anvira/o1e" element={<AnviraO1E />} />
              <Route path="/anvira/h1" element={<AnviraH1 />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/about" element={<About />} />
              <Route path="/opensource" element={<OpenSource />} />
              <Route path="/release-logs" element={<ReleaseLogs />} />
              <Route path="/devquill" element={<DevQuill />} />
              <Route path="/inkflow" element={<InkFlow />} />
              <Route path="/nomi" element={<Nomi />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
