import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemsProvider } from "@/context/ItemsContext";
import Catalog from "./pages/Catalog";
import ItemDetails from "./pages/ItemDetails";
import AddItem from "./pages/AddItem";
import MyRequests from "./pages/MyRequests";
import MapView from "./pages/MapView";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ItemsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ItemsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
