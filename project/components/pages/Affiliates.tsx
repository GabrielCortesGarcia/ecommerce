import { motion } from "motion/react";
import { Users, DollarSign, TrendingUp, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Affiliates() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Comisiones Altas",
      description: "Hasta 15% de comisión en todas las ventas",
      highlight: "15%"
    },
    {
      icon: TrendingUp,
      title: "Crecimiento",
      description: "Herramientas avanzadas de seguimiento y analytics",
      highlight: "24/7"
    },
    {
      icon: Gift,
      title: "Bonos",
      description: "Bonificaciones especiales por objetivos alcanzados",
      highlight: "$500+"
    }
  ];

  const tiers = [
    {
      name: "Bronce",
      sales: "$0 - $1,000",
      commission: "8%",
      color: "bg-orange-100 text-orange-800"
    },
    {
      name: "Plata",
      sales: "$1,001 - $5,000",
      commission: "12%",
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "Oro",
      sales: "$5,001+",
      commission: "15%",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Programa de Afiliados
        </h1>
        <p className="text-xl text-muted-foreground">
          Monetiza tu audiencia con comisiones atractivas
        </p>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="glass bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">¡Únete a nuestro programa hoy!</h2>
            <p className="text-muted-foreground mb-6">
              Gana dinero promocionando los productos que amas. Sin costos de entrada, 
              con pagos puntuales y soporte dedicado.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-8 py-3">
              Aplicar Ahora - Es Gratis
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">¿Por qué ser nuestro afiliado?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass text-center hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-3">{benefit.description}</p>
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {benefit.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commission Tiers */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Niveles de Comisión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((tier, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <Badge className={tier.color + " mb-3"}>{tier.name}</Badge>
                  <h4 className="font-bold text-lg mb-2">{tier.commission}</h4>
                  <p className="text-sm text-muted-foreground">Comisión</p>
                  <p className="text-xs text-muted-foreground mt-2">{tier.sales}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>¿Cómo funciona?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-2">Aplica</h4>
                <p className="text-sm text-muted-foreground">
                  Completa el formulario de aplicación
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-2">Aprobación</h4>
                <p className="text-sm text-muted-foreground">
                  Revisamos tu aplicación en 24-48 horas
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-2">Promociona</h4>
                <p className="text-sm text-muted-foreground">
                  Comparte tus enlaces únicos
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-600 font-bold">4</span>
                </div>
                <h4 className="font-medium mb-2">Gana</h4>
                <p className="text-sm text-muted-foreground">
                  Recibe comisiones cada mes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-green-600">✅ Requisitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">Sitio web o blog activo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">Audiencia en redes sociales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">Contenido de calidad</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">Alineación con nuestros valores</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>📊 Herramientas Incluidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">Dashboard de analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">Materiales promocionales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">Enlaces únicos de seguimiento</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">Soporte dedicado</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="glass bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-2">¿Listo para empezar?</h3>
            <p className="text-muted-foreground mb-6">
              Únete a más de 1,000 afiliados que ya están ganando con StyleShop
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 mr-4">
              Aplicar Ahora
            </Button>
            <Button variant="outline">
              Más Información
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}