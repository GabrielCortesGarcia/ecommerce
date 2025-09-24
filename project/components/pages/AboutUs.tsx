import { motion } from "motion/react";
import { Heart, Users, Globe, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Sobre Nosotros
        </h1>
        <p className="text-xl text-muted-foreground">
          Creando moda accesible y sostenible desde 2020
        </p>
      </div>

      <div className="space-y-8">
        <Card className="glass">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              StyleShop nació de la pasión por democratizar la moda. Fundada en 2020 por un equipo de diseñadores 
              y emprendedores, nuestra misión es hacer que la moda de calidad sea accesible para todos, sin comprometer 
              nuestros valores de sostenibilidad y ética.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Desde nuestros humildes comienzos como una pequeña boutique online, hemos crecido hasta convertirnos 
              en una marca reconocida que sirve a clientes en más de 50 países, siempre manteniendo nuestro compromiso 
              con la calidad, la innovación y la responsabilidad social.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass text-center">
            <CardContent className="p-6">
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">1M+</h3>
              <p className="text-muted-foreground">Clientes Satisfechos</p>
            </CardContent>
          </Card>
          <Card className="glass text-center">
            <CardContent className="p-6">
              <Globe className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">50+</h3>
              <p className="text-muted-foreground">Países Atendidos</p>
            </CardContent>
          </Card>
          <Card className="glass text-center">
            <CardContent className="p-6">
              <Award className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">4.8★</h3>
              <p className="text-muted-foreground">Calificación Promedio</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-blue-600">🌱 Sostenibilidad</h4>
              <p className="text-sm text-muted-foreground">
                Comprometidos con prácticas ecológicas y materiales sostenibles en toda nuestra cadena de suministro.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-600">🤝 Ética</h4>
              <p className="text-sm text-muted-foreground">
                Trabajamos únicamente con proveedores que garantizan condiciones laborales justas y éticas.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-600">💎 Calidad</h4>
              <p className="text-sm text-muted-foreground">
                Cada producto pasa por rigurosos controles de calidad para garantizar la satisfacción del cliente.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-orange-600">🎨 Innovación</h4>
              <p className="text-sm text-muted-foreground">
                Constantemente exploramos nuevas tendencias y tecnologías para ofrecer lo mejor en moda.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}