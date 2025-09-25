import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "./ProductCard";

// Import all page components
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import SizeGuide from "./pages/SizeGuide";
import ShippingReturns from "./pages/ShippingReturns";
import FAQ from "./pages/FAQ";
import OrderStatus from "./pages/OrderStatus";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Sustainability from "./pages/Sustainability";
import Press from "./pages/Press";
import Affiliates from "./pages/Affiliates";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

export type PageType = 
  | "terms" 
  | "privacy" 
  | "forgot-password"
  | "women" 
  | "men" 
  | "kids" 
  | "accessories" 
  | "sale"
  | "contact"
  | "size-guide"
  | "shipping-returns"
  | "faq"
  | "order-status"
  | "about"
  | "careers"
  | "sustainability"
  | "press"
  | "affiliates"
  | "profile"
  | "orders"
  | "settings"
  | "favorites"
  | "checkout";

interface PageRouterProps {
  currentPage: PageType;
  onBack: () => void;
  favoriteIds?: string[];
  onAddToCart?: (product: Product, options?: { size?: string; color?: string; quantity: number }) => void;
  onToggleFavorite?: (productId: string) => void;
  onProductClick?: (product: Product) => void;
  cartItems?: any[];
  onOrderComplete?: () => void;
}

export default function PageRouter({ 
  currentPage, 
  onBack, 
  favoriteIds = [], 
  onAddToCart, 
  onToggleFavorite, 
  onProductClick,
  cartItems = [],
  onOrderComplete
}: PageRouterProps) {
  const getPageComponent = () => {
    switch (currentPage) {
      case "terms":
        return <TermsOfService />;
      case "privacy":
        return <PrivacyPolicy />;
      case "forgot-password":
        return <ForgotPassword />;
      case "women":
        return <CategoryPage 
          category="Mujer" 
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />;
      case "men":
        return <CategoryPage 
          category="Hombre" 
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />;
      case "kids":
        return <CategoryPage 
          category="Niños" 
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />;
      case "accessories":
        return <CategoryPage 
          category="Accesorios" 
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />;
      case "sale":
        return <CategoryPage 
          category="Sale" 
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />;
      case "contact":
        return <Contact />;
      case "size-guide":
        return <SizeGuide />;
      case "shipping-returns":
        return <ShippingReturns />;
      case "faq":
        return <FAQ />;
      case "order-status":
        return <OrderStatus />;
      case "about":
        return <AboutUs />;
      case "careers":
        return <Careers />;
      case "sustainability":
        return <Sustainability />;
      case "press":
        return <Press />;
      case "affiliates":
        return <Affiliates />;
      case "profile":
        return <Profile />;
      case "orders":
        return <Orders />;
      case "settings":
        return <Settings />;
      case "favorites":
        return <Favorites 
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />;
      case "checkout":
        return <Checkout 
          cartItems={cartItems}
          onOrderComplete={onOrderComplete || (() => {})}
        />;
      default:
        return <div>Página no encontrada</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getPageComponent()}
        </motion.div>
      </div>
    </motion.div>
  );
}