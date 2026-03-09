import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
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
        <Routes>
          <Route path="/mapa" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
