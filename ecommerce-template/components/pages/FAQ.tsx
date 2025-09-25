import { motion } from "motion/react";
import { HelpCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useState } from "react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "Pedidos",
      questions: [
        {
          q: "¿Cómo puedo realizar un pedido?",
          a: "Puedes realizar un pedido fácilmente navegando por nuestro catálogo, agregando productos a tu carrito y siguiendo el proceso de checkout. Aceptamos tarjetas de crédito, débito y PayPal."
        },
        {
          q: "¿Puedo modificar mi pedido después de realizarlo?",
          a: "Puedes modificar tu pedido dentro de las primeras 2 horas después de realizarlo. Después de este tiempo, el pedido entra en procesamiento y no puede modificarse."
        },
        {
          q: "¿Cómo puedo cancelar mi pedido?",
          a: "Puedes cancelar tu pedido gratuitamente antes de que sea enviado. Contacta nuestro servicio al cliente con tu número de pedido."
        }
      ]
    },
    {
      category: "Envíos",
      questions: [
        {
          q: "¿Cuánto tiempo tarda en llegar mi pedido?",
          a: "Los tiempos de entrega varían según la opción elegida: Estándar (5-7 días), Express (2-3 días), Overnight (1 día). Los pedidos se procesan en 1-2 días hábiles."
        },
        {
          q: "¿Ofrecen envío gratuito?",
          a: "Sí, ofrecemos envío gratuito en pedidos superiores a $100. Para pedidos menores, el costo de envío estándar es $9.99."
        },
        {
          q: "¿Envían internacionalmente?",
          a: "Sí, enviamos a más de 50 países. Los costos y tiempos de entrega varían según el destino. Puedes consultar las opciones durante el checkout."
        }
      ]
    },
    {
      category: "Devoluciones",
      questions: [
        {
          q: "¿Cuál es su política de devoluciones?",
          a: "Aceptamos devoluciones dentro de 30 días de la compra. Los productos deben estar en condiciones originales con etiquetas. La primera devolución es gratuita."
        },
        {
          q: "¿Cómo inicio una devolución?",
          a: "Puedes iniciar una devolución desde tu cuenta en 'Mis Pedidos' o contactando nuestro servicio al cliente. Te enviaremos una etiqueta de envío prepagada."
        },
        {
          q: "¿Cuánto tiempo tarda el reembolso?",
          a: "Los reembolsos se procesan en 3-5 días hábiles una vez que recibimos tu devolución. El tiempo puede variar según tu método de pago."
        }
      ]
    },
    {
      category: "Productos",
      questions: [
        {
          q: "¿Cómo sé qué talla elegir?",
          a: "Consulta nuestra guía de tallas detallada disponible en cada producto. También ofrecemos chat en vivo para asesoramiento personalizado."
        },
        {
          q: "¿Los colores en las fotos son exactos?",
          a: "Hacemos nuestro mejor esfuerzo para mostrar colores precisos, pero pueden variar ligeramente debido a la configuración de pantalla. Incluimos descripciones detalladas de colores."
        },
        {
          q: "¿Cómo cuido mis productos?",
          a: "Cada producto incluye instrucciones de cuidado específicas en la etiqueta. Generalmente recomendamos lavar en agua fría y secar al aire."
        }
      ]
    },
    {
      category: "Cuenta",
      questions: [
        {
          q: "¿Necesito crear una cuenta para comprar?",
          a: "No es obligatorio, pero crear una cuenta te permite guardar direcciones, ver historial de pedidos y acceder a ofertas exclusivas."
        },
        {
          q: "¿Cómo cambio mi contraseña?",
          a: "Puedes cambiar tu contraseña desde 'Mi Cuenta' > 'Configuración' o usar la opción '¿Olvidaste tu contraseña?' en el login."
        },
        {
          q: "¿Puedo cambiar mi dirección de envío?",
          a: "Sí, puedes gestionar múltiples direcciones desde tu cuenta. También puedes cambiar la dirección durante el checkout."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-xl text-muted-foreground">
          Encuentra respuestas a las preguntas más comunes sobre StyleShop
        </p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="glass">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {filteredFaqs.map((category, categoryIndex) => (
          <Card key={category.category} className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">{getCategoryIcon(category.category)}</span>
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {filteredFaqs.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <Card className="glass">
            <CardContent className="p-8">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
              <p className="text-muted-foreground mb-4">
                No encontramos preguntas que coincidan con "{searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground">
                ¿No encuentras lo que buscas? <br />
                <a href="#" className="text-blue-600 hover:underline">Contacta nuestro soporte</a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="glass bg-blue-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">¿No encontraste tu respuesta?</h3>
            <p className="text-muted-foreground mb-4">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Chat en vivo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Enviar email
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    "Pedidos": "🛍️",
    "Envíos": "🚚",
    "Devoluciones": "🔄",
    "Productos": "👕",
    "Cuenta": "👤"
  };
  return icons[category] || "❓";
}