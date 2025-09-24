import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

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
  | "affiliates";

interface PageRouterProps {
  currentPage: PageType;
  onBack: () => void;
}

export default function PageRouter({ currentPage, onBack }: PageRouterProps) {
  const getPageComponent = () => {
    switch (currentPage) {
      case "terms":
        return <TermsOfService />;
      case "privacy":
        return <PrivacyPolicy />;
      case "forgot-password":
        return <ForgotPassword />;
      case "women":
        return <CategoryPage category="Mujer" />;
      case "men":
        return <CategoryPage category="Hombre" />;
      case "kids":
        return <CategoryPage category="Niños" />;
      case "accessories":
        return <CategoryPage category="Accesorios" />;
      case "sale":
        return <CategoryPage category="Sale" />;
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