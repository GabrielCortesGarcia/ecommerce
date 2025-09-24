import { useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface ShoppingCartProps {
  isOpen?: boolean;
  onClose?: () => void;
  cartItems: CartItem[];
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
  trigger?: React.ReactNode;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  trigger
}: ShoppingCartProps) {
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem?.(itemId);
    } else {
      onUpdateQuantity?.(itemId, newQuantity);
    }
  };

  const CartContent = () => (
    <div className="flex flex-col h-full">
      <SheetHeader className="border-b pb-4">
        <div className="flex items-center justify-between">
          <SheetTitle>Carrito de Compras ({cartItems.length})</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SheetHeader>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <h3 className="text-lg font-medium mb-2">Tu carrito está vacío</h3>
            <p className="text-muted-foreground mb-4">
              Agrega algunos productos para comenzar
            </p>
            <Button onClick={onClose}>Continuar comprando</Button>
          </div>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  
                  {/* Selected Options */}
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                    {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                    {item.selectedColor && (
                      <div className="flex items-center gap-1">
                        <span>Color:</span>
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Price and Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium">${item.price}</span>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => onRemoveItem?.(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t pt-4 space-y-4">
            {/* Promo Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Código promocional</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ingresa tu código"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline">Aplicar</Button>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Impuestos</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Free Shipping Message */}
            {shipping > 0 && (
              <div className="bg-muted p-3 rounded text-sm text-center">
                ¡Envío gratis en compras mayores a $100!
                <br />
                Agrega ${(100 - subtotal).toFixed(2)} más para calificar.
              </div>
            )}

            {/* Checkout Button */}
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Proceder al pago
            </Button>
            
            <Button variant="outline" className="w-full" onClick={onClose}>
              Continuar comprando
            </Button>
          </div>
        </>
      )}
    </div>
  );

  if (trigger) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <CartContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <CartContent />
      </SheetContent>
    </Sheet>
  );
}