import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthGuard from "@/components/auth/AuthGuard";
import { Home } from "@/pages";
import { Signup, Pin, Setup, ForgotPasscode } from "./pages/auth";
import {
  CreditCards,
  IdNumbers,
  Dashboard,
  Password,
  AddPassword,
  EditPassword,
  Profile,
  PrivateNotes,
  AddNote,
  EditNote,
  ViewNote,
  SecretUrls,
  AddUrl,
  EditUrl,
} from "./pages/main";
import NotFound from "./pages/not-found";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/ui/page-transition";

export default function App() {
  const location = useLocation();
  return (
    <>
      <AuthGuard />
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
  
           <Route
            path="/signup"
            element={
              <PageTransition>
                <Signup />
              </PageTransition>
            }
          />
          <Route
            path="/pin"
            element={
              <PageTransition>
                <Pin />
              </PageTransition>
            }
          />
          <Route
            path="/setup"
            element={
              <PageTransition>
                <Setup />
              </PageTransition>
            }
          />
          <Route
            path="/forgot-passcode"
            element={
              <PageTransition>
                <ForgotPasscode />
              </PageTransition>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/credentials"
            element={
              <ProtectedRoute>
                <Password />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/credentials/add"
            element={
              <ProtectedRoute>
                <AddPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/credentials/edit/:id"
            element={
              <ProtectedRoute>
                <EditPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/id-numbers"
            element={
              <ProtectedRoute>
                <IdNumbers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/credit-cards"
            element={
              <ProtectedRoute>
                <CreditCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/notes"
            element={
              <ProtectedRoute>
                <PrivateNotes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/notes/add"
            element={
              <ProtectedRoute>
                <AddNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/notes/edit/:id"
            element={
              <ProtectedRoute>
                <EditNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/notes/view/:id"
            element={
              <ProtectedRoute>
                <ViewNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/secret-urls"
            element={
              <ProtectedRoute>
                <SecretUrls />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/secret-urls/add"
            element={
              <ProtectedRoute>
                <AddUrl />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/secret-urls/edit/:id"
            element={
              <ProtectedRoute>
                <EditUrl />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
