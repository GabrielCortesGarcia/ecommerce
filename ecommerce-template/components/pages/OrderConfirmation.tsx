import { motion } from "motion/react";
import { CheckCircle, Package, Clock, Mail, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface OrderConfirmationProps {
  orderNumber: string;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export default function OrderConfirmation({ 
  orderNumber, 
  onContinueShopping, 
  onViewOrders 
}: OrderConfirmationProps) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const nextSteps = [
    {
      icon: Mail,
      title: "Confirmación por Email",
      description: "Te enviaremos un email de confirmación con todos los detalles del pedido",
      status: "completed"
    },
    {
      icon: Package,
      title: "Preparación del Pedido",
      description: "Nuestro equipo empezará a preparar tu pedido inmediatamente",
      status: "in-progress"
    },
    {
      icon: Clock,
      title: "Envío Estimado",
      description: `Tu pedido llegará aproximadamente el ${estimatedDelivery.toLocaleDateString('es-ES')}`,
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            ¡Pedido Confirmado!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-4"
          >
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2"
          >
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Pedido #{orderNumber}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Order Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Estado de tu Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-100 text-green-600' :
                        step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          step.status === 'completed' ? 'text-green-800' :
                          step.status === 'in-progress' ? 'text-blue-800' :
                          'text-gray-600'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {step.description}
                        </p>
                      </div>
                      {step.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Confirmación por Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Recibirás un email de confirmación con todos los detalles de tu pedido y un enlace para hacer seguimiento.
              </p>
              <div className="text-sm text-blue-600">
                <p>• Factura detallada</p>
                <p>• Número de seguimiento</p>
                <p>• Fecha estimada de entrega</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Seguimiento del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 mb-4">
                Podrás seguir el estado de tu pedido en tiempo real desde tu perfil de usuario.
              </p>
              <div className="text-sm text-purple-600">
                <p>• Estado en tiempo real</p>
                <p>• Notificaciones automáticas</p>
                <p>• Historial completo</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onViewOrders}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            Ver Mis Pedidos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            onClick={onContinueShopping}
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Continuar Comprando
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="font-semibold text-gray-800 mb-3">¿Necesitas ayuda?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800">Centro de Ayuda</p>
              <p>Encuentra respuestas a preguntas frecuentes</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Chat en Vivo</p>
              <p>Habla con nuestro equipo de soporte</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p>support@styleshop.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}