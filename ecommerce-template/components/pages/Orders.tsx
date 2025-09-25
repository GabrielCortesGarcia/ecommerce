import { useState } from "react";
import { motion } from "motion/react";
import { Package, Eye, Download, Star, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 159.99,
    items: [
      {
        id: "1",
        name: "Vestido Floral Elegante",
        image: "/api/placeholder/80/80",
        size: "M",
        color: "Azul",
        quantity: 1,
        price: 89.99
      },
      {
        id: "2",
        name: "Bolso de Cuero Premium",
        image: "/api/placeholder/80/80",
        size: "Único",
        color: "Negro",
        quantity: 1,
        price: 69.99
      }
    ],
    shippingAddress: "Calle Mayor 123, Madrid, 28001",
    trackingNumber: "ESP123456789",
    estimatedDelivery: "2024-01-18"
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 129.99,
    items: [
      {
        id: "3",
        name: "Chaqueta Denim Vintage",
        image: "/api/placeholder/80/80",
        size: "L",
        color: "Azul claro",
        quantity: 1,
        price: 79.99
      },
      {
        id: "4",
        name: "Zapatillas Deportivas",
        image: "/api/placeholder/80/80",
        size: "38",
        color: "Blanco",
        quantity: 1,
        price: 49.99
      }
    ],
    shippingAddress: "Calle Mayor 123, Madrid, 28001",
    trackingNumber: "ESP987654321",
    estimatedDelivery: "2024-01-25"
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-22",
    status: "processing",
    total: 199.99,
    items: [
      {
        id: "5",
        name: "Abrigo de Lana Premium",
        image: "/api/placeholder/80/80",
        size: "S",
        color: "Gris",
        quantity: 1,
        price: 199.99
      }
    ],
    shippingAddress: "Calle Mayor 123, Madrid, 28001",
    estimatedDelivery: "2024-01-28"
  }
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'Procesando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const filterOrders = (orders: Order[], filter: string) => {
    switch (filter) {
      case 'delivered':
        return orders.filter(order => order.status === 'delivered');
      case 'active':
        return orders.filter(order => ['pending', 'processing', 'shipped'].includes(order.status));
      case 'cancelled':
        return orders.filter(order => order.status === 'cancelled');
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders(mockOrders, activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mis Pedidos
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">Todos ({mockOrders.length})</TabsTrigger>
              <TabsTrigger value="active">Activos ({filterOrders(mockOrders, 'active').length})</TabsTrigger>
              <TabsTrigger value="delivered">Entregados ({filterOrders(mockOrders, 'delivered').length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelados ({filterOrders(mockOrders, 'cancelled').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Pedido #{order.id}
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{getStatusText(order.status)}</span>
                            </Badge>
                          </CardTitle>
                          <p className="text-muted-foreground">
                            Realizado el {new Date(order.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">€{order.total}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 mb-4">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Talla: {item.size} | Color: {item.color}
                              </p>
                              <p className="text-sm font-medium">€{item.price}</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-lg">
                            <span className="text-sm font-medium">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                        <div className="flex-1">
                          {order.trackingNumber && (
                            <p className="text-sm text-muted-foreground mb-1">
                              <strong>Seguimiento:</strong> {order.trackingNumber}
                            </p>
                          )}
                          {order.estimatedDelivery && (
                            <p className="text-sm text-muted-foreground">
                              <strong>Entrega estimada:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('es-ES')}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Detalles del Pedido #{order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                  <Badge className={getStatusColor(order.status)}>
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1">{getStatusText(order.status)}</span>
                                  </Badge>
                                  <p className="text-lg font-bold">€{order.total}</p>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Artículos:</h4>
                                  <div className="space-y-3">
                                    {order.items.map((item) => (
                                      <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                          <Package className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-muted-foreground">
                                            Talla: {item.size} | Color: {item.color} | Cantidad: {item.quantity}
                                          </p>
                                        </div>
                                        <p className="font-medium">€{item.price}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Dirección de Envío:</h4>
                                  <p className="text-muted-foreground">{order.shippingAddress}</p>
                                </div>

                                {order.trackingNumber && (
                                  <div>
                                    <h4 className="font-medium mb-2">Información de Envío:</h4>
                                    <p className="text-sm text-muted-foreground">
                                      <strong>Número de seguimiento:</strong> {order.trackingNumber}
                                    </p>
                                    {order.estimatedDelivery && (
                                      <p className="text-sm text-muted-foreground">
                                        <strong>Entrega estimada:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('es-ES')}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {order.status === 'delivered' && (
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                      <Star className="h-4 w-4 mr-2" />
                                      Valorar Productos
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Comprar de Nuevo
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Factura
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {filteredOrders.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay pedidos</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'all' 
                      ? 'Aún no has realizado ningún pedido.' 
                      : `No tienes pedidos ${getStatusText(activeTab as Order['status']).toLowerCase()}.`
                    }
                  </p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}