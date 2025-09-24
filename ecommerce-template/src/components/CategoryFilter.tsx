import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  brands: string[];
  rating: number;
}

interface CategoryFilterProps {
  onFiltersChange?: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
  availableOptions?: {
    categories: string[];
    sizes: string[];
    colors: { name: string; value: string }[];
    brands: string[];
    maxPrice: number;
  };
}

const defaultAvailableOptions = {
  categories: ["Camisetas", "Pantalones", "Vestidos", "Zapatos", "Accesorios", "Chaquetas"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Negro", value: "#000000" },
    { name: "Blanco", value: "#FFFFFF" },
    { name: "Azul", value: "#0066CC" },
    { name: "Rojo", value: "#CC0000" },
    { name: "Verde", value: "#00CC66" },
    { name: "Rosa", value: "#FF66CC" },
  ],
  brands: ["Nike", "Adidas", "Zara", "H&M", "Pull & Bear", "Bershka"],
  maxPrice: 500
};

export default function CategoryFilter({
  onFiltersChange,
  initialFilters = {},
  availableOptions = defaultAvailableOptions
}: CategoryFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialFilters.categories || [],
    priceRange: initialFilters.priceRange || [0, availableOptions.maxPrice],
    sizes: initialFilters.sizes || [],
    colors: initialFilters.colors || [],
    brands: initialFilters.brands || [],
    rating: initialFilters.rating || 0
  });

  const [isOpen, setIsOpen] = useState({
    categories: true,
    price: true,
    sizes: true,
    colors: true,
    brands: false,
    rating: false
  });

  const filterRef = useRef(null);
  const isInView = useInView(filterRef, { once: true, margin: "-50px" });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const toggleArrayFilter = (key: keyof FilterOptions, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters({ [key]: newArray });
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      categories: [],
      priceRange: [0, availableOptions.maxPrice],
      sizes: [],
      colors: [],
      brands: [],
      rating: 0
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const activeFiltersCount = 
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < availableOptions.maxPrice ? 1 : 0);

  return (
    <motion.div
      ref={filterRef}
      initial={{ opacity: 0, x: -50, rotateY: -10 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        x: isInView ? 0 : -50, 
        rotateY: isInView ? 0 : -10 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="sticky top-20 overflow-hidden">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2"
              >
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Filter className="h-5 w-5" />
                  </motion.div>
                  Filtros
                  {activeFiltersCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge variant="secondary">{activeFiltersCount}</Badge>
                    </motion.div>
                  )}
                </CardTitle>
              </motion.div>
              {activeFiltersCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Limpiar
                  </Button>
                </motion.div>
              )}
            </div>
          </CardHeader>
        </motion.div>

        <CardContent className="space-y-6">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Collapsible 
              open={isOpen.categories} 
              onOpenChange={(open) => setIsOpen(prev => ({ ...prev, categories: open }))}
            >
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md p-2 -m-2 transition-colors"
                >
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span>Categorías</span>
                    <motion.span 
                      animate={{ rotate: isOpen.categories ? 0 : 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                <motion.div
                  initial={false}
                  animate={{ height: "auto" }}
                  className="space-y-2"
                >
                  {availableOptions.categories.map((category, index) => (
                    <motion.div 
                      key={category} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        x: 5, 
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                        borderRadius: "6px"
                      }}
                      className="flex items-center space-x-2 p-1 -m-1 transition-all"
                    >
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleArrayFilter('categories', category)}
                      />
                      <motion.label 
                        htmlFor={`category-${category}`} 
                        className="text-sm cursor-pointer flex-1"
                        whileHover={{ color: "rgb(59, 130, 246)" }}
                      >
                        {category}
                      </motion.label>
                    </motion.div>
                  ))}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Price Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Collapsible 
              open={isOpen.price} 
              onOpenChange={(open) => setIsOpen(prev => ({ ...prev, price: open }))}
            >
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md p-2 -m-2 transition-colors"
                >
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span>Precio</span>
                    <motion.span 
                      animate={{ rotate: isOpen.price ? 0 : 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                    max={availableOptions.maxPrice}
                    step={10}
                    className="w-full"
                  />
                  <motion.div 
                    className="flex justify-between text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.span
                      key={filters.priceRange[0]}
                      initial={{ scale: 1.2, color: "rgb(59, 130, 246)" }}
                      animate={{ scale: 1, color: "rgb(113, 113, 130)" }}
                      transition={{ duration: 0.3 }}
                    >
                      ${filters.priceRange[0]}
                    </motion.span>
                    <motion.span
                      key={filters.priceRange[1]}
                      initial={{ scale: 1.2, color: "rgb(59, 130, 246)" }}
                      animate={{ scale: 1, color: "rgb(113, 113, 130)" }}
                      transition={{ duration: 0.3 }}
                    >
                      ${filters.priceRange[1]}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Sizes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Collapsible 
              open={isOpen.sizes} 
              onOpenChange={(open) => setIsOpen(prev => ({ ...prev, sizes: open }))}
            >
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md p-2 -m-2 transition-colors"
                >
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span>Tallas</span>
                    <motion.span 
                      animate={{ rotate: isOpen.sizes ? 0 : 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                <motion.div 
                  className="grid grid-cols-3 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {availableOptions.sizes.map((size, index) => (
                    <motion.div
                      key={size}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={filters.sizes.includes(size) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleArrayFilter('sizes', size)}
                        className="h-8 w-full"
                      >
                        {size}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Collapsible 
              open={isOpen.colors} 
              onOpenChange={(open) => setIsOpen(prev => ({ ...prev, colors: open }))}
            >
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md p-2 -m-2 transition-colors"
                >
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span>Colores</span>
                    <motion.span 
                      animate={{ rotate: isOpen.colors ? 0 : 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                <motion.div 
                  className="grid grid-cols-4 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {availableOptions.colors.map((color, index) => (
                    <motion.button
                      key={color.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleArrayFilter('colors', color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        filters.colors.includes(color.name) 
                          ? 'border-blue-500 ring-2 ring-blue-500/30' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Collapsible 
              open={isOpen.brands} 
              onOpenChange={(open) => setIsOpen(prev => ({ ...prev, brands: open }))}
            >
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md p-2 -m-2 transition-colors"
                >
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span>Marcas</span>
                    <motion.span 
                      animate={{ rotate: isOpen.brands ? 0 : 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {availableOptions.brands.map((brand, index) => (
                    <motion.div 
                      key={brand} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        x: 5, 
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                        borderRadius: "6px"
                      }}
                      className="flex items-center space-x-2 p-1 -m-1 transition-all"
                    >
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => toggleArrayFilter('brands', brand)}
                      />
                      <motion.label 
                        htmlFor={`brand-${brand}`} 
                        className="text-sm cursor-pointer flex-1"
                        whileHover={{ color: "rgb(59, 130, 246)" }}
                      >
                        {brand}
                      </motion.label>
                    </motion.div>
                  ))}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Collapsible 
              open={isOpen.rating} 
              onOpenChange={(open) => setIsOpen(prev => ({ ...prev, rating: open }))}
            >
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md p-2 -m-2 transition-colors"
                >
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span>Calificación</span>
                    <motion.span 
                      animate={{ rotate: isOpen.rating ? 0 : 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <motion.div 
                      key={rating}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        x: 5, 
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                        borderRadius: "6px"
                      }}
                      className="flex items-center space-x-2 p-1 -m-1 transition-all cursor-pointer"
                      onClick={() => updateFilters({ rating: filters.rating === rating ? 0 : rating })}
                    >
                      <Checkbox
                        checked={filters.rating === rating}
                        disabled
                      />
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-sm ml-1">y más</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}