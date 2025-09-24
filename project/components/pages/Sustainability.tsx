import { motion } from "motion/react";
import { Leaf, Recycle, Heart, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Sustainability() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Sostenibilidad
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprometidos con un futuro más verde para la moda
        </p>
      </div>

      <div className="space-y-8">
        <Card className="glass bg-green-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión Verde</h2>
            <p className="text-muted-foreground leading-relaxed">
              En StyleShop creemos que la moda puede ser hermosa sin dañar el planeta. 
              Trabajamos incansablemente para reducir nuestro impacto ambiental a través 
              de prácticas sostenibles en toda nuestra cadena de suministro.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-green-600" />
                Materiales Reciclados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                El 70% de nuestros productos utilizan materiales reciclados o de origen sostenible.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Algodón orgánico certificado</li>
                <li>• Poliéster reciclado de botellas plásticas</li>
                <li>• Tintes naturales libres de químicos</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Carbono Neutral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Compensamos el 100% de nuestras emisiones de carbono a través de proyectos verificados.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Reforestación en América Latina</li>
                <li>• Energías renovables en fábricas</li>
                <li>• Envíos carbono neutral</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Nuestros Objetivos 2025</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-sm">Materiales Sostenibles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <p className="text-sm">Emisiones Netas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
              <p className="text-sm">Reducción de Agua</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">Zero</div>
              <p className="text-sm">Desperdicio</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Compromiso Social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              La sostenibilidad va más allá del medio ambiente. También incluye el bienestar 
              de las personas en nuestra cadena de suministro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Condiciones Laborales</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Salarios justos garantizados</li>
                  <li>• Jornadas laborales reguladas</li>
                  <li>• Ambiente de trabajo seguro</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Comunidades</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Programas de educación</li>
                  <li>• Apoyo a artesanos locales</li>
                  <li>• Inversión en infraestructura</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}