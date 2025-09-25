import { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Lock, MapPin, User, Package, ArrowRight, Shield, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { CartItem } from "../ShoppingCart";

interface CheckoutProps {
  cartItems: CartItem[];
  onOrderComplete: (orderNumber: string) => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout({ cartItems, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [saveInfo, setSaveInfo] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "España",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === "express" ? 9.99 : shippingMethod === "standard" ? 4.99 : 0;
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + shippingCost + tax;

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.email) newErrors.email = "Email es requerido";
      if (!formData.firstName) newErrors.firstName = "Nombre es requerido";
      if (!formData.lastName) newErrors.lastName = "Apellido es requerido";
      if (!formData.address) newErrors.address = "Dirección es requerida";
      if (!formData.city) newErrors.city = "Ciudad es requerida";
      if (!formData.postalCode) newErrors.postalCode = "Código postal es requerido";
    }

    if (stepNumber === 2 && paymentMethod === "card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Número de tarjeta es requerido";
      if (!formData.expiryDate) newErrors.expiryDate = "Fecha de vencimiento es requerida";
      if (!formData.cvv) newErrors.cvv = "CVV es requerido";
      if (!formData.cardName) newErrors.cardName = "Nombre en la tarjeta es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    
    // Generate order number
    const orderNumber = `SH${Date.now().toString().slice(-6)}`;
    onOrderComplete(orderNumber);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const shippingOptions = [
    { id: "standard", name: "Envío Estándar", time: "5-7 días laborables", price: 4.99 },
    { id: "express", name: "Envío Express", time: "2-3 días laborables", price: 9.99 },
    { id: "free", name: "Envío Gratuito", time: "7-10 días laborables", price: 0 }
  ];

  const paymentMethods = [
    { id: "card", name: "Tarjeta de Crédito/Débito", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: Shield },
    { id: "bank", name: "Transferencia Bancaria", icon: Lock }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= stepNumber 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </div>
                <span 
                  className={`ml-2 text-sm ${
                    step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {stepNumber === 1 && "Información"}
                  {stepNumber === 2 && "Pago"}
                  {stepNumber === 3 && "Confirmación"}
                </span>
                {stepNumber < 3 && (
                  <ArrowRight className="w-4 h-4 mx-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Información de Envío
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nombre *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Dirección *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Código Postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          className={errors.postalCode ? "border-red-500" : ""}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                      <div>
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Método de Envío
                      </h3>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        {shippingOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div className="flex-1">
                              <label htmlFor={option.id} className="cursor-pointer">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{option.name}</p>
                                    <p className="text-sm text-gray-500">{option.time}</p>
                                  </div>
                                  <p className="font-semibold">
                                    {option.price === 0 ? "Gratis" : `€${option.price.toFixed(2)}`}
                                  </p>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700">
                        Continuar al Pago
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Información de Pago
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Method */}
                    <div className="space-y-4">
                      <h3>Método de Pago</h3>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Icon className="h-5 w-5" />
                              <label htmlFor={method.id} className="cursor-pointer flex-1">
                                {method.name}
                              </label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formatCardNumber(formData.cardNumber)}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value.replace(/\s/g, ''))}
                            maxLength={19}
                            className={errors.cardNumber ? "border-red-500" : ""}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                              maxLength={5}
                              className={errors.expiryDate ? "border-red-500" : ""}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              maxLength={4}
                              className={errors.cvv ? "border-red-500" : ""}
                            />
                            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            className={errors.cardName ? "border-red-500" : ""}
                          />
                          {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "paypal" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-blue-50 rounded-lg text-center"
                      >
                        <p>Serás redirigido a PayPal para completar el pago de forma segura.</p>
                      </motion.div>
                    )}

                    {paymentMethod === "bank" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="mb-2">Datos para transferencia bancaria:</p>
                        <p><strong>IBAN:</strong> ES91 2100 0418 4502 0005 1332</p>
                        <p><strong>BIC:</strong> CAIXESBBXXX</p>
                        <p><strong>Concepto:</strong> Pedido #{Date.now()}</p>
                      </motion.div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="saveInfo" 
                        checked={saveInfo}
                        onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                      />
                      <label htmlFor="saveInfo" className="text-sm">
                        Guardar información para futuros pedidos
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Volver
                      </Button>
                      <Button 
                        onClick={handleNextStep}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Revisar Pedido
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Confirmar Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Summary */}
                    <div className="space-y-4">
                      <h3>Resumen del Pedido</h3>
                      {cartItems.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-4 p-3 border rounded-lg">
                          <img 
                            src={item.images[0]} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4>{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              {item.selectedSize && `Talla: ${item.selectedSize}`}
                              {item.selectedColor && ` | Color: ${item.selectedColor}`}
                            </p>
                            <p className="text-sm">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4>Dirección de Envío</h4>
                        <div className="p-3 bg-gray-50 rounded-lg text-sm">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.address}</p>
                          <p>{formData.city}, {formData.postalCode}</p>
                          <p>{formData.country}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4>Método de Pago</h4>
                        <div className="p-3 bg-gray-50 rounded-lg text-sm">
                          <p>{paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                          {paymentMethod === "card" && formData.cardNumber && (
                            <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Volver
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Procesando...
                          </div>
                        ) : (
                          <>
                            Confirmar Pedido
                            <Lock className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumen de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{shippingCost === 0 ? "Gratis" : `€${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (21%)</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>

                {/* Security badges */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield className="h-4 w-4" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">SSL</Badge>
                    <Badge variant="secondary" className="text-xs">256-bit</Badge>
                    <Badge variant="secondary" className="text-xs">Secure</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}