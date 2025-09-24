import { useState } from "react";
import { Heart, Share, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";

interface ProductDetailsProps {
  product: Product;
  onAddToCart?: (product: Product, options: { size?: string; color?: string; quantity: number }) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  relatedProducts?: Product[];
}

export default function ProductDetails({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  relatedProducts = []
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock additional images (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const reviews = [
    {
      id: "1",
      user: "María García",
      rating: 5,
      comment: "Excelente calidad, muy cómodo y el material es suave.",
      date: "2024-01-15"
    },
    {
      id: "2",
      user: "Carlos López",
      rating: 4,
      comment: "Buen producto, aunque el envío tardó un poco más de lo esperado.",
      date: "2024-01-10"
    },
    {
      id: "3",
      user: "Ana Rodríguez",
      rating: 5,
      comment: "Me encanta! La talla es perfecta y el color es exactamente como se ve en la foto.",
      date: "2024-01-08"
    }
  ];

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Por favor selecciona un color");
      return;
    }

    onAddToCart?.(product, {
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg border">
            <ImageWithFallback
              src={productImages[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  activeImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.isNew && <Badge>Nuevo</Badge>}
              {product.isOnSale && <Badge variant="destructive">-{discountPercentage}%</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Options */}
          <div className="space-y-4">
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color: {selectedColor && <span className="font-normal">({selectedColor})</span>}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-primary' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Talla</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una talla" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Cantidad</label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              Agregar al carrito - ${(product.price * quantity).toFixed(2)}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onToggleFavorite?.(product.id)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
              </Button>
              
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-3 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Envío gratis en compras mayores a $100</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Devoluciones gratis dentro de 30 días</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Garantía de 2 años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({reviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>
                Este producto ha sido diseñado con los más altos estándares de calidad y comodidad. 
                Fabricado con materiales premium que garantizan durabilidad y un ajuste perfecto.
              </p>
              <p>
                Ideal para uso diario, combina estilo y funcionalidad. Su diseño versátil lo hace 
                perfecto para cualquier ocasión, desde casual hasta semi-formal.
              </p>
              <h4>Características principales:</h4>
              <ul>
                <li>Material de alta calidad</li>
                <li>Diseño ergonómico</li>
                <li>Fácil cuidado y mantenimiento</li>
                <li>Disponible en múltiples tallas y colores</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Detalles del producto</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>Material:</dt>
                    <dd>100% Algodón</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Origen:</dt>
                    <dd>Importado</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Cuidado:</dt>
                    <dd>Lavado a máquina</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Ajuste:</dt>
                    <dd>Regular</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Medidas</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>Largo:</dt>
                    <dd>70 cm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Ancho:</dt>
                    <dd>50 cm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Peso:</dt>
                    <dd>200g</dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Reviews Summary */}
              <div className="flex items-center gap-8 p-6 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="flex items-center justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {product.reviewCount} reseñas
                  </div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-8">{stars}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div 
                          className="h-2 bg-yellow-400 rounded" 
                          style={{ width: `${(stars === 5 ? 60 : stars === 4 ? 30 : 10)}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {stars === 5 ? '60%' : stars === 4 ? '30%' : '10%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}