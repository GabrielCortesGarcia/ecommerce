import { useState } from "react";
import { motion } from "motion/react";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import ProductGrid from "../ProductGrid";
import CategoryFilter, { FilterOptions } from "../CategoryFilter";
import { mockProducts } from "../mockData";
import { Product } from "../ProductCard";

interface CategoryPageProps {
  category: string;
  favoriteIds?: string[];
  onAddToCart?: (product: Product, options?: { size?: string; color?: string; quantity: number }) => void;
  onToggleFavorite?: (productId: string) => void;
  onProductClick?: (product: Product) => void;
}

export default function CategoryPage({ 
  category, 
  favoriteIds = [], 
  onAddToCart, 
  onToggleFavorite, 
  onProductClick 
}: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    genderCategories: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    brands: [],
    rating: 0
  });

  // Filter products based on category and filters
  const filteredProducts = mockProducts.filter(product => {
    if (category === "Sale") {
      return product.isOnSale;
    }
    
    // Filter by gender category for Mujer, Hombre, Niños
    const genderCategories = ["Mujer", "Hombre", "Niños"];
    let matchesCategory = false;
    
    if (genderCategories.includes(category)) {
      // Filter by gender category
      matchesCategory = product.genderCategory === category || product.genderCategory === "Unisex";
    } else {
      // Filter by product category (Accesorios, etc.)
      matchesCategory = category === "Todos" || product.category === category;
    }
    
    const matchesPrice = product.price >= filters.priceRange[0] && 
                        product.price <= filters.priceRange[1];
    const matchesRating = filters.rating === 0 || product.rating >= filters.rating;

    return matchesCategory && matchesPrice && matchesRating;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const getCategoryDescription = () => {
    switch (category) {
      case "Mujer":
        return "Descubre la última moda femenina con estilos únicos y tendencias actuales";
      case "Hombre":
        return "Ropa masculina moderna y sofisticada para cada ocasión";
      case "Niños":
        return "Moda infantil cómoda y divertida para los más pequeños";
      case "Accesorios":
        return "Complementa tu look con nuestros accesorios exclusivos";
      case "Sale":
        return "Ofertas increíbles en tus productos favoritos - ¡Stock limitado!";
      default:
        return "Explora nuestra colección completa";
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case "Sale":
        return "🔥";
      case "Mujer":
        return "👗";
      case "Hombre":
        return "👔";
      case "Niños":
        return "🧸";
      case "Accesorios":
        return "👜";
      default:
        return "🛍️";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-6xl mb-4"
        >
          {getCategoryIcon()}
        </motion.div>
        <h1 className="text-4xl font-bold mb-2">{category}</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          {getCategoryDescription()}
        </p>
      </motion.div>

      {/* Stats and Controls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Results Count */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {sortedProducts.length} productos encontrados
                </Badge>
                {category === "Sale" && (
                  <Badge className="bg-red-500 text-white">
                    Ofertas especiales
                  </Badge>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="newest">Más nuevos</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a menor</SelectItem>
                    <SelectItem value="rating">Mejor valorados</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}
        >
          <CategoryFilter
            onFiltersChange={setFilters}
            initialFilters={filters}
          />
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3"
        >
          {sortedProducts.length > 0 ? (
            <ProductGrid
              products={sortedProducts}
              onAddToCart={onAddToCart || (() => {})}
              onToggleFavorite={onToggleFavorite || (() => {})}
              onProductClick={onProductClick || (() => {})}
              favoriteIds={favoriteIds}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <Card className="glass">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">😔</div>
                  <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
                  <p className="text-muted-foreground mb-6">
                    No hay productos disponibles con los filtros seleccionados
                  </p>
                  <Button 
                    onClick={() => setFilters({
                      categories: [],
                      genderCategories: [],
                      priceRange: [0, 500],
                      sizes: [],
                      colors: [],
                      brands: [],
                      rating: 0
                    })}
                    variant="outline"
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Category Features */}
      {category === "Sale" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass bg-gradient-to-r from-red-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-red-600">¡Ofertas por tiempo limitado!</h3>
              <p className="text-muted-foreground mb-4">
                Aprovecha estos descuentos especiales antes de que se agoten
              </p>
              <div className="flex justify-center gap-6 text-sm">
                <div>
                  <span className="font-bold text-red-600">Hasta 70%</span>
                  <p className="text-muted-foreground">de descuento</p>
                </div>
                <div>
                  <span className="font-bold text-red-600">Envío gratis</span>
                  <p className="text-muted-foreground">en todas las ofertas</p>
                </div>
                <div>
                  <span className="font-bold text-red-600">Stock limitado</span>
                  <p className="text-muted-foreground">¡No te lo pierdas!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}