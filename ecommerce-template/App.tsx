import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CategoryFilter, { FilterOptions } from "./components/CategoryFilter";
import ShoppingCart, { CartItem } from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import AdminPanel from "./components/AdminPanel";
import ChatSupport from "./components/ChatSupport";
import PageRouter, { PageType } from "./components/PageRouter";
import { AuthProvider } from "./components/AuthContext";
import { mockProducts } from "./components/mockData";
import { Product } from "./components/ProductCard";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyOffers, setShowOnlyOffers] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    genderCategories: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    brands: [],
    rating: 0
  });

  // Scroll animations - ALWAYS call hooks at top level
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0.6]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filter products based on search and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filters.categories.length === 0 || 
                           filters.categories.includes(product.category);
    
    const matchesGenderCategory = filters.genderCategories.length === 0 || 
                                 filters.genderCategories.includes(product.genderCategory);
    
    const matchesPrice = product.price >= filters.priceRange[0] && 
                        product.price <= filters.priceRange[1];
    
    const matchesRating = filters.rating === 0 || product.rating >= filters.rating;

    const matchesOffers = !showOnlyOffers || product.isOnSale;

    return matchesSearch && matchesCategory && matchesGenderCategory && matchesPrice && matchesRating && matchesOffers;
  });

  const handleAddToCart = (product: Product, options?: { size?: string; color?: string; quantity: number }) => {
    const quantity = options?.quantity || 1;
    const size = options?.size;
    const color = options?.color;

    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { 
        ...product, 
        quantity, 
        selectedSize: size, 
        selectedColor: color 
      }];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleToggleFavorite = (productId: string) => {
    setFavoriteIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const handleExploreCollection = () => {
    // Reset offers filter and scroll to products section smoothly
    setShowOnlyOffers(false);
    const productsSection = document.querySelector('.container.mx-auto.px-4.py-12');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewOffers = () => {
    // Clear other filters and enable offers-only view  
    setFilters({
      categories: [],
      genderCategories: [],
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      brands: [],
      rating: 0
    });
    setSearchQuery(""); // Clear search
    setShowOnlyOffers(true); // Enable offers filter
    
    // Scroll to products section
    const productsSection = document.querySelector('.container.mx-auto.px-4.py-12');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage("checkout");
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentPage(null);
    alert("¡Pedido realizado con éxito! Recibirás un email de confirmación.");
  };

  const handleNewsletterSubmit = (email: string) => {
    alert(`¡Gracias por suscribirte con el email: ${email}!`);
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAdminClick = () => {
    setIsAdminPanelOpen(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedProduct(null);
  };

  const handleBackToHome = () => {
    setCurrentPage(null);
    setSelectedProduct(null);
  };

  // Floating background elements for dynamism
  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          x: { type: "spring", stiffness: 50, damping: 10 },
          y: { type: "spring", stiffness: 50, damping: 10 },
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
          rotate: [360, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { type: "spring", stiffness: 50, damping: 10 },
          y: { type: "spring", stiffness: 50, damping: 10 },
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/2 w-32 h-32 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
          scale: [1, 1.2, 1],
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          x: { type: "spring", stiffness: 50, damping: 10 },
          y: { type: "spring", stiffness: 50, damping: 10 },
        }}
      />
    </div>
  );

  if (isAdminPanelOpen) {
    return (
      <AuthProvider>
        <div className="min-h-screen">
          <FloatingElements />
          <AdminPanel />
          <motion.button 
            onClick={() => setIsAdminPanelOpen(false)}
            className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Volver a la tienda
          </motion.button>
        </div>
      </AuthProvider>
    );
  }

  if (currentPage) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 relative">
          <FloatingElements />
          <motion.div style={{ y: yRange, opacity: opacityRange }}>
            <Navbar 
              cartItemsCount={cartItems.length}
              onCartClick={() => setIsCartOpen(true)}
              onSearchChange={setSearchQuery}
              onLoginClick={handleLoginClick}
              onAdminClick={handleAdminClick}
              onNavigate={handleNavigate}
            />
          </motion.div>
          
          <AnimatePresence mode="wait">
            <PageRouter
              currentPage={currentPage}
              onBack={handleBackToHome}
              favoriteIds={favoriteIds}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onProductClick={handleProductClick}
              cartItems={cartItems}
              onOrderComplete={handleOrderComplete}
            />
          </AnimatePresence>

          <Footer 
            onNewsletterSubmit={handleNewsletterSubmit} 
            onNavigate={handleNavigate}
          />
          
          <ShoppingCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onNavigate={handleNavigate}
          />

          <ChatSupport />
        </div>
      </AuthProvider>
    );
  }

  if (selectedProduct) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 relative">
          <FloatingElements />
          <motion.div style={{ y: yRange, opacity: opacityRange }}>
            <Navbar 
              cartItemsCount={cartItems.length}
              onCartClick={() => setIsCartOpen(true)}
              onSearchChange={setSearchQuery}
              onLoginClick={handleLoginClick}
              onAdminClick={handleAdminClick}
              onNavigate={handleNavigate}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pt-4"
          >
            <div className="container mx-auto px-4 mb-4">
              <motion.button 
                whileHover={{ x: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToProducts}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                ← Volver a productos
              </motion.button>
            </div>
            
            <ProductDetails
              product={selectedProduct}
              onAddToCart={(product, options) => handleAddToCart(product, options)}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favoriteIds.includes(selectedProduct.id)}
            />
          </motion.div>

          <Footer 
            onNewsletterSubmit={handleNewsletterSubmit} 
            onNavigate={handleNavigate}
          />
          
          <ShoppingCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onNavigate={handleNavigate}
          />

          <ChatSupport />
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 relative overflow-hidden">
        <FloatingElements />
        
        {/* Parallax Navbar */}
        <motion.div style={{ y: yRange, opacity: opacityRange }}>
          <Navbar 
            cartItemsCount={cartItems.length}
            onCartClick={() => setIsCartOpen(true)}
            onSearchChange={setSearchQuery}
            onLoginClick={handleLoginClick}
            onAdminClick={handleAdminClick}
            onNavigate={handleNavigate}
          />
        </motion.div>
        
        {/* Hero with enhanced scroll effects */}
        <motion.div 
          style={{ 
            y: heroY,
            scale: heroScale
          }}
        >
          <Hero 
            onCtaClick={handleExploreCollection}
            onOffersClick={handleViewOffers}
          />
        </motion.div>
        
        {/* Main Content with staggered animations */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="container mx-auto px-4 py-12 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Filters Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -60, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ 
                delay: 0.5, 
                duration: 0.8, 
                type: "spring",
                stiffness: 100 
              }}
              className="lg:col-span-1"
              style={{
                transform: `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`
              }}
            >
              <CategoryFilter 
                onFiltersChange={setFilters}
                initialFilters={filters}
              />
            </motion.div>
            
            {/* Enhanced Products Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 60, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ 
                delay: 0.7, 
                duration: 0.8, 
                type: "spring",
                stiffness: 100 
              }}
              className="lg:col-span-3"
              style={{
                transform: `translateX(${mousePosition.x * -3}px) translateY(${mousePosition.y * -3}px)`
              }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.h2 
                      className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {showOnlyOffers ? '🔥 Ofertas Especiales' : searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los Productos'}
                    </motion.h2>
                    {showOnlyOffers && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setShowOnlyOffers(false)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                      >
                        × Ver todos
                      </motion.button>
                    )}
                  </div>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {filteredProducts.length} productos encontrados
                  </motion.p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onProductClick={handleProductClick}
                  favoriteIds={favoriteIds}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <Footer 
            onNewsletterSubmit={handleNewsletterSubmit} 
            onNavigate={handleNavigate}
          />
        </motion.div>
        
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onNavigate={handleNavigate}
        />

        <ChatSupport />
      </div>
    </AuthProvider>
  );
}