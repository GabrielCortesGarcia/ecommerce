import { motion } from "motion/react";
import { Truck, Package, RotateCcw, Clock, Shield, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

export default function ShippingReturns() {
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
          className="flex justify-center gap-4 mb-4"
        >
          <Truck className="h-12 w-12 text-blue-600" />
          <RotateCcw className="h-12 w-12 text-purple-600" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Envíos y Devoluciones
        </h1>
        <p className="text-xl text-muted-foreground">
          Información completa sobre nuestros servicios de entrega y política de devoluciones
        </p>
      </div>

      <Tabs defaultValue="shipping" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Envíos
          </TabsTrigger>
          <TabsTrigger value="returns" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Devoluciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipping" className="mt-6 space-y-6">
          {/* Shipping Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Opciones de Envío
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium">Estándar</h4>
                      <Badge variant="secondary">Gratis +$100</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">5-7 días hábiles</p>
                    <p className="text-lg font-bold">$9.99</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium">Express</h4>
                      <Badge>Recomendado</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">2-3 días hábiles</p>
                    <p className="text-lg font-bold">$19.99</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">Overnight</h4>
                      <Badge variant="destructive">Rápido</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">1 día hábil</p>
                    <p className="text-lg font-bold">$39.99</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipping Zones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Zonas de Envío
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">🇺🇸 Estados Unidos</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Envío estándar:</span>
                        <span>5-7 días</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Envío express:</span>
                        <span>2-3 días</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Envío overnight:</span>
                        <span>1 día</span>
                      </li>
                      <li className="flex justify-between font-medium">
                        <span>Envío gratis desde:</span>
                        <span>$100</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-blue-600">🌍 Internacional</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Canadá:</span>
                        <span>7-10 días</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Europa:</span>
                        <span>10-14 días</span>
                      </li>
                      <li className="flex justify-between">
                        <span>América Latina:</span>
                        <span>12-18 días</span>
                      </li>
                      <li className="flex justify-between font-medium">
                        <span>Costo adicional:</span>
                        <span>$25-50</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass bg-blue-50">
              <CardHeader>
                <CardTitle>📦 Información Importante de Envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Los pedidos se procesan dentro de 1-2 días hábiles</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Recibirás un número de seguimiento por email</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Los envíos se realizan de lunes a viernes</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Empaque discreto y seguro garantizado</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Seguro incluido en todos los envíos</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="returns" className="mt-6 space-y-6">
          {/* Return Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Política de Devoluciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-green-600">✅ Lo que aceptamos</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Productos en condiciones originales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Con etiquetas originales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Sin usar ni lavar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Dentro de 30 días de la compra</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Con comprobante de compra</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-red-600">❌ Lo que no aceptamos</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <span>Ropa interior y trajes de baño</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <span>Productos personalizados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <span>Productos en oferta final</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <span>Artículos usados o dañados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <span>Después de 30 días</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle>🔄 Proceso de Devolución</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Solicitar</h4>
                    <p className="text-sm text-muted-foreground">
                      Inicia tu solicitud online o contacta soporte
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <h4 className="font-medium mb-2">Empacar</h4>
                    <p className="text-sm text-muted-foreground">
                      Usa la etiqueta prepagada que te enviamos
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Enviar</h4>
                    <p className="text-sm text-muted-foreground">
                      Deja el paquete en cualquier punto de entrega
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-yellow-600 font-bold">4</span>
                    </div>
                    <h4 className="font-medium mb-2">Reembolso</h4>
                    <p className="text-sm text-muted-foreground">
                      Recibe tu dinero en 3-5 días hábiles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Refund Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass bg-purple-50">
              <CardHeader>
                <CardTitle>💰 Información de Reembolsos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Métodos de Reembolso</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Tarjeta de crédito original: 3-5 días</li>
                      <li>• PayPal: 1-2 días</li>
                      <li>• Crédito en tienda: Inmediato</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Costos de Devolución</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Primera devolución: <strong>Gratis</strong></li>
                      <li>• Devoluciones adicionales: $9.99</li>
                      <li>• Productos defectuosos: <strong>Gratis</strong></li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm">
                    <strong>Garantía de satisfacción:</strong> Si no estás 100% satisfecho con tu compra, 
                    te devolvemos tu dinero sin preguntas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}