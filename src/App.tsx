import { Navigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from 'react-helmet-async';
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";

import Index from "./pages/Index";
import Vision from "./pages/Vision";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReleaseLogs from "./pages/ReleaseLogs";
import NotFound from "./pages/NotFound";
import Anvira from "./pages/Anvira";
import AnviraO1 from "./pages/AnviraO1";
import AnviraO1E from "./pages/AnviraO1E";
import AnviraH1 from "./pages/AnviraH1";
import DevQuill from "./pages/DevQuill";
import InkFlow from "./pages/InkFlow";
import Nomi from "./pages/Nomi";
import Mission from "./pages/Mission";
import Research from "./pages/Research";
import Sitemap from "./pages/Sitemap";
import Stack from "./pages/Stack";
import Aicl from "./pages/stack/Aicl";
import Orcha from "./pages/stack/Orcha";
import Memory from "./pages/stack/Memory";
import Safety from "./pages/stack/Safety";
import Tools from "./pages/stack/Tools";
import Modules from "./pages/stack/Modules";
import Products from "./pages/Products";
import Docs from "./pages/Docs";
import Start from "./pages/Start";
import Faq from "./pages/Faq";
import Benchmarks from "./pages/Benchmarks";
import UseCases from "./pages/UseCases";
import UcAiTutors from "./pages/use-cases/AiTutors";
import UcHealthcare from "./pages/use-cases/Healthcare";
import UcAgriculture from "./pages/use-cases/Agriculture";
import UcResearch from "./pages/use-cases/Research";
import UcEnterprise from "./pages/use-cases/Enterprise";
import UcEdgeAi from "./pages/use-cases/EdgeAi";
import WorkWithUs from "./pages/WorkWithUs";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// App (authenticated)
import AppLayout from "./components/app/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import ProfilePage from "./pages/app/ProfilePage";
import AccountSettings from "./pages/app/AccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <PageTransition />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/anvira" element={<Anvira />} />
                <Route path="/anvira/o1" element={<AnviraO1 />} />
                <Route path="/anvira/o1e" element={<AnviraO1E />} />
                <Route path="/anvira/h1" element={<AnviraH1 />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/about" element={<About />} />
                <Route path="/opensource" element={<Navigate to="/research" replace />} />
                <Route path="/release-logs" element={<ReleaseLogs />} />
                <Route path="/devquill" element={<DevQuill />} />
                <Route path="/inkflow" element={<InkFlow />} />
                <Route path="/nomi" element={<Nomi />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/research" element={<Research />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/contact" element={<Contact />} />

                {/* Stack */}
                <Route path="/stack" element={<Stack />} />
                <Route path="/stack/aicl" element={<Aicl />} />
                <Route path="/stack/orcha" element={<Orcha />} />
                <Route path="/stack/memory" element={<Memory />} />
                <Route path="/stack/safety" element={<Safety />} />
                <Route path="/stack/tools" element={<Tools />} />
                <Route path="/stack/modules" element={<Modules />} />

                {/* Hub pages */}
                <Route path="/products" element={<Products />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/start" element={<Start />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/benchmarks" element={<Benchmarks />} />

                {/* Use cases */}
                <Route path="/use-cases" element={<UseCases />} />
                <Route path="/use-cases/ai-tutors" element={<UcAiTutors />} />
                <Route path="/use-cases/healthcare" element={<UcHealthcare />} />
                <Route path="/use-cases/agriculture" element={<UcAgriculture />} />
                <Route path="/use-cases/research" element={<UcResearch />} />
                <Route path="/use-cases/enterprise-private-ai" element={<UcEnterprise />} />
                <Route path="/use-cases/edge-ai" element={<UcEdgeAi />} />

                <Route path="/work-with-us" element={<WorkWithUs />} />

                {/* Auth */}
                <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
                <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
                <Route path="/signup" element={<Navigate to="/register" replace />} />
                <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* Authenticated app */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<AccountSettings />} />
                </Route>
                <Route path="/account" element={<Navigate to="/dashboard/settings" replace />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
