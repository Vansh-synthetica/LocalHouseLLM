import { type ReactNode, Suspense } from "react";
import { Navigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";

import NotFound from "./pages/NotFound";
// Every other page is its own chunk — see src/pages.ts.
import {
  Index,
  About,
  Anvira,
  AnviraNotes,
  Releases,
  Archive,
  PaperReader,
  Stack,
  Docs,
  Faq,
  OrchaLicense,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  AccountProfile,
  AccountReset,
  AppLayout,
  Dashboard,
  ProfilePage,
  AccountSettings,
} from "./pages";

const queryClient = new QueryClient();

/** Providers shared by the browser app and the build-time prerenderer. */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

const AppRoutes = () => (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/anvira" element={<Anvira />} />
              <Route path="/anvira-notes" element={<AnviraNotes />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/releases/:product" element={<Releases />} />
              <Route path="/about" element={<About />} />
              <Route path="/stack" element={<Stack />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/archive/:slug" element={<PaperReader />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/orcha/license" element={<OrchaLicense />} />

              {/* Consolidated: Mission/Vision/Contact merged into About */}
              <Route path="/mission" element={<Navigate to="/about" replace />} />
              <Route path="/vision" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<Navigate to="/about" replace />} />
              <Route path="/work-with-us" element={<Navigate to="/about" replace />} />

              {/* Consolidated: the six stack detail pages merged into /stack as anchors */}
              <Route path="/stack/aicl" element={<Navigate to="/stack#aicl" replace />} />
              <Route path="/stack/orcha" element={<Navigate to="/stack#orcha" replace />} />
              <Route path="/stack/memory" element={<Navigate to="/stack#memory" replace />} />
              <Route path="/stack/safety" element={<Navigate to="/stack#safety" replace />} />
              <Route path="/stack/tools" element={<Navigate to="/stack#tools" replace />} />
              <Route path="/stack/modules" element={<Navigate to="/stack#modules" replace />} />

              {/* Hidden for now — pages kept on disk, just unrouted; redirect rather than 404 */}
              <Route path="/nomi" element={<Navigate to="/stack#memory" replace />} />
              <Route path="/products" element={<Navigate to="/anvira" replace />} />
              <Route path="/frameworks" element={<Navigate to="/stack" replace />} />
              <Route path="/start" element={<Navigate to="/docs" replace />} />
              <Route path="/benchmarks" element={<Navigate to="/stack" replace />} />
              <Route path="/use-cases" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/ai-tutors" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/healthcare" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/agriculture" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/research" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/enterprise-private-ai" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/edge-ai" element={<Navigate to="/" replace />} />
              <Route path="/release-logs" element={<Navigate to="/releases" replace />} />
              <Route path="/changelog" element={<Navigate to="/releases" replace />} />
              <Route path="/sitemap" element={<Navigate to="/" replace />} />

              {/* Legacy redirects (pre-existing) */}
              <Route path="/opensource" element={<Navigate to="/archive" replace />} />
              <Route path="/research" element={<Navigate to="/archive" replace />} />

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
              {/* Anvira Notes opens /account/profile from "Manage profile" — keep this URL working. */}
              <Route path="/account/profile" element={<AccountProfile />} />
              <Route path="/account/reset" element={<AccountReset />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
);

/**
 * Everything under the router, shared by the browser app and the prerenderer so
 * both trees match. The Suspense boundary (for lazily loaded pages) sits above
 * AuthProvider on purpose: auth state updates as soon as it mounts, and an update
 * reaching a boundary that is still hydrating makes React throw away the
 * prerendered HTML and re-render the page (React error #421).
 */
export const AppBody = () => (
  <Suspense fallback={null}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Suspense>
);

const App = () => (
  <HelmetProvider>
    <AppShell>
      {/* startTransition keeps the current page on screen while the next page's chunk loads. */}
      <BrowserRouter future={{ v7_startTransition: true }}>
        <AppBody />
      </BrowserRouter>
    </AppShell>
  </HelmetProvider>
);

export default App;
