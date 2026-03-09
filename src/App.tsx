import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import CitizensPage from "./pages/CitizensPage";
import SensorsPage from "./pages/SensorsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/mapa";
  return (
    <>
      <Navbar />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/gradjani-reporteri" element={<CitizensPage />} />
            <Route path="/senzori" element={<SensorsPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/prijava" element={<LoginPage />} />
            <Route path="/registracija" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
