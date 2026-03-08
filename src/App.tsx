import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import History from "./pages/History";
import Departments from "./pages/Departments";
import DeansOffice from "./pages/DeansOffice";
import Students from "./pages/Students";
import Alumni from "./pages/Alumni";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/history" element={<History />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:deptId" element={<Departments />} />
          <Route path="/deans-office" element={<DeansOffice />} />
          <Route path="/deans-office/:subpage" element={<DeansOffice />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:subpage" element={<Students />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/alumni/:subpage" element={<Alumni />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
