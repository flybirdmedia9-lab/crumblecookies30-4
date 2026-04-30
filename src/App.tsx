import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { OrderProvider } from "@/context/OrderContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BagDrawer } from "@/components/layout/BagDrawer";
import { AdminGuard } from "@/components/admin/AdminGuard";

// Customer pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Track from "./pages/Track";
import Account from "./pages/Account";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminShipping from "./pages/admin/AdminShipping";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminContent from "./pages/admin/AdminContent";

const queryClient = new QueryClient();

const StorefrontLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
    <BagDrawer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <Routes>
                  {/* Admin routes — no storefront chrome */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
                  <Route path="/admin/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
                  <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
                  <Route path="/admin/customers" element={<AdminGuard><AdminCustomers /></AdminGuard>} />
                  <Route path="/admin/coupons" element={<AdminGuard><AdminCoupons /></AdminGuard>} />
                  <Route path="/admin/inventory" element={<AdminGuard><AdminInventory /></AdminGuard>} />
                  <Route path="/admin/shipping" element={<AdminGuard><AdminShipping /></AdminGuard>} />
                  <Route path="/admin/reviews" element={<AdminGuard><AdminReviews /></AdminGuard>} />
                  <Route path="/admin/content" element={<AdminGuard><AdminContent /></AdminGuard>} />

                  {/* Storefront routes */}
                  <Route path="/" element={<StorefrontLayout><Index /></StorefrontLayout>} />
                  <Route path="/products" element={<StorefrontLayout><Products /></StorefrontLayout>} />
                  <Route path="/products/:id" element={<StorefrontLayout><ProductDetail /></StorefrontLayout>} />
                  <Route path="/cart" element={<StorefrontLayout><Cart /></StorefrontLayout>} />
                  <Route path="/checkout" element={<StorefrontLayout><Checkout /></StorefrontLayout>} />
                  <Route path="/order-confirmation" element={<StorefrontLayout><OrderConfirmation /></StorefrontLayout>} />
                  <Route path="/wishlist" element={<StorefrontLayout><Wishlist /></StorefrontLayout>} />
                  <Route path="/account" element={<StorefrontLayout><Account /></StorefrontLayout>} />
                  <Route path="/login" element={<StorefrontLayout><Login /></StorefrontLayout>} />
                  <Route path="/register" element={<StorefrontLayout><Register /></StorefrontLayout>} />
                  <Route path="/forgot-password" element={<StorefrontLayout><ForgotPassword /></StorefrontLayout>} />
                  <Route path="/about" element={<StorefrontLayout><About /></StorefrontLayout>} />
                  <Route path="/contact" element={<StorefrontLayout><Contact /></StorefrontLayout>} />
                  <Route path="/faq" element={<StorefrontLayout><FAQ /></StorefrontLayout>} />
                  <Route path="/shipping" element={<StorefrontLayout><Shipping /></StorefrontLayout>} />
                  <Route path="/refund" element={<StorefrontLayout><Refund /></StorefrontLayout>} />
                  <Route path="/track" element={<StorefrontLayout><Track /></StorefrontLayout>} />
                  <Route path="/privacy" element={<StorefrontLayout><Privacy /></StorefrontLayout>} />
                  <Route path="/terms" element={<StorefrontLayout><Terms /></StorefrontLayout>} />
                  <Route path="*" element={<StorefrontLayout><NotFound /></StorefrontLayout>} />
                </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
