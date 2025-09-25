import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  onProductClick?: (product: Product) => void;
  favoriteIds?: string[];
  isLoading?: boolean;
  itemsPerPage?: number;
}

export default function ProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  onProductClick,
  favoriteIds = [],
  isLoading = false,
  itemsPerPage = 12
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, margin: "-100px" });

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handleLoadMore = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(itemsPerPage)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No se encontraron productos
        </h3>
        <p className="text-muted-foreground">
          Intenta ajustar tus filtros o buscar algo diferente.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      ref={gridRef}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.7 }}
      transition={{ duration: 0.6 }}
    >
      {/* Products Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
        {paginatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              onProductClick={onProductClick}
              isFavorite={favoriteIds.includes(product.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Results Summary */}
      <motion.div 
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Mostrando {Math.min(currentPage * itemsPerPage, products.length)} de {products.length} productos
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!hasPrevPage}
            >
              Anterior
            </Button>
          </motion.div>
          
          <div className="flex items-center space-x-1">
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNumber = Math.max(1, currentPage - 2) + index;
              if (pageNumber > totalPages) return null;
              
              return (
                <motion.div
                  key={pageNumber}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={!hasNextPage}
            >
              Siguiente
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Load More Alternative */}
      {hasNextPage && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={handleLoadMore} variant="outline" size="lg">
              Cargar más productos
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}