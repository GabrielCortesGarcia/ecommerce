import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Search, User, Menu, Heart, LogOut, Settings, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth } from "./AuthContext";

interface NavbarProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
  onSearchChange?: (value: string) => void;
  onLoginClick?: () => void;
  onAdminClick?: () => void;
  onNavigate?: (page: string) => void;
}

export default function Navbar({ cartItemsCount = 0, onCartClick, onSearchChange, onLoginClick, onAdminClick, onNavigate }: NavbarProps) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"]
  );
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b glass backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StyleShop
            </h1>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { label: "Mujer", page: "women" },
              { label: "Hombre", page: "men" },
              { label: "Niños", page: "kids" },
              { label: "Accesorios", page: "accessories" },
              { label: "Sale", page: "sale" }
            ].map((item) => (
              <motion.button
                key={item.page}
                onClick={() => onNavigate?.(item.page)}
                className="hover:text-primary transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
                />
              </motion.button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <motion.div 
              className="relative w-full"
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                onChange={(e) => onSearchChange?.(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                      <User className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  <DropdownMenuItem className="font-medium">
                    Hola, {user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={onAdminClick}>
                        <Settings className="mr-2 h-4 w-4" />
                        Panel Admin
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Mis Pedidos</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden md:inline-flex"
                  onClick={onLoginClick}
                >
                  <User className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Heart className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={onCartClick}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-glow"
                  >
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </motion.span>
                )}
              </Button>
            </motion.div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden pb-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10 border-blue-200 focus:border-blue-400"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}