import { motion } from "motion/react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  onProductClick?: (product: Product) => void;
  isFavorite?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  onProductClick,
  isFavorite = false 
}: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer glass border-blue-100">
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => onProductClick?.(product)}
          />
          
          {/* Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-2 left-2 flex flex-col gap-1"
          >
            {product.isNew && (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Nuevo</Badge>
              </motion.div>
            )}
            {product.isOnSale && discountPercentage > 0 && (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge variant="destructive">-{discountPercentage}%</Badge>
              </motion.div>
            )}
          </motion.div>

          {/* Favorite Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 glass hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(product.id);
              }}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              />
            </Button>
          </motion.div>

          {/* Quick Add to Cart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Agregar al carrito
              </Button>
            </motion.div>
          </motion.div>
        </div>

      <CardContent className="p-4" onClick={() => onProductClick?.(product)}>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}