import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          
          {/* Keep other existing routes if any before NotFound Page */}
          {/* Example of other routes:
          <Route path="/settings" element={<SettingsPage />} /> 
          */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;