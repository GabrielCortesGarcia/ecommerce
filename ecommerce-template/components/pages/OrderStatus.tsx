import { useState } from "react";
import { motion } from "motion/react";
import { Package, Search, Truck, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function OrderStatus() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!orderNumber || !email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock order data
    setOrderData({
      orderNumber: orderNumber,
      status: "shipped",
      estimatedDelivery: "2024-01-15",
      trackingNumber: "1Z999AA123456789",
      items: [
        { name: "Vestido Floral Azul", quantity: 1, price: 89.99 },
        { name: "Zapatos Casuales", quantity: 1, price: 129.99 }
      ],
      total: 219.98,
      shippingAddress: {
        name: "María García",
        address: "Calle Principal 123",
        city: "Madrid",
        zipCode: "28001"
      },
      timeline: [
        { status: "ordered", date: "2024-01-10", completed: true },
        { status: "processing", date: "2024-01-11", completed: true },
        { status: "shipped", date: "2024-01-12", completed: true },
        { status: "delivered", date: "2024-01-15", completed: false }
      ]
    });
    
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ordered": return <Package className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ordered": return "bg-blue-500";
      case "processing": return "bg-yellow-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ordered": return "Pedido Confirmado";
      case "processing": return "Preparando Envío";
      case "shipped": return "Enviado";
      case "delivered": return "Entregado";
      default: return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Estado del Pedido
        </h1>
        <p className="text-xl text-muted-foreground">
          Rastrea tu pedido en tiempo real
        </p>
      </div>

      {!orderData ? (
        /* Search Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center">
                <Search className="h-5 w-5 text-blue-600" />
                Buscar Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Número de Pedido</label>
                <Input
                  placeholder="ej. STY123456789"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email de Confirmación</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                disabled={isLoading || !orderNumber || !email}
              >
                {isLoading ? "Buscando..." : "Buscar Pedido"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>¿No tienes tu número de pedido?</p>
                <p>Revisa el email de confirmación que recibiste</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Order Details */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Order Summary */}
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Pedido #{orderData.orderNumber}</CardTitle>
                  <p className="text-muted-foreground">
                    Entrega estimada: {new Date(orderData.estimatedDelivery).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <Badge className={`${getStatusColor(orderData.status)} text-white`}>
                  {getStatusText(orderData.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Dirección de Envío</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.address}</p>
                    <p>{orderData.shippingAddress.city} {orderData.shippingAddress.zipCode}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Número de Seguimiento</h4>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {orderData.trackingNumber}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Rastrear con Transportista
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Estado del Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.timeline.map((step: any, index: number) => (
                  <div key={step.status} className="flex items-center gap-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-white
                      ${step.completed ? getStatusColor(step.status) : 'bg-gray-300'}
                    `}>
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {getStatusText(step.status)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {step.completed ? new Date(step.date).toLocaleDateString('es-ES') : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Artículos del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${orderData.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => setOrderData(null)}
            >
              Buscar Otro Pedido
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              Contactar Soporte
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}