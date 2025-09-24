import { motion } from "motion/react";
import { Newspaper, Download, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Press() {
  const pressReleases = [
    {
      title: "StyleShop Lanza Nueva Colección Sostenible",
      date: "2024-01-15",
      category: "Producto",
      excerpt: "La nueva línea EcoFashion representa nuestro mayor compromiso con la sostenibilidad..."
    },
    {
      title: "Expansión Internacional a 10 Nuevos Países",
      date: "2023-12-20",
      category: "Expansión",
      excerpt: "StyleShop continúa su crecimiento global llegando a mercados emergentes..."
    },
    {
      title: "Alianza Estratégica con Artesanos Locales",
      date: "2023-11-30",
      category: "Sostenibilidad",
      excerpt: "Nuevo programa de colaboración que beneficia a comunidades textiles tradicionales..."
    }
  ];

  const awards = [
    {
      title: "Mejor Empresa Sostenible 2023",
      organization: "Fashion Sustainability Awards",
      year: "2023"
    },
    {
      title: "Innovación en E-commerce",
      organization: "Digital Commerce Awards",
      year: "2023"
    },
    {
      title: "Empresa del Año - Moda",
      organization: "Business Excellence Awards",
      year: "2022"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <Newspaper className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Sala de Prensa
        </h1>
        <p className="text-xl text-muted-foreground">
          Últimas noticias y recursos para medios de comunicación
        </p>
      </div>

      <div className="space-y-8">
        {/* Press Kit */}
        <Card className="glass bg-blue-50">
          <CardHeader>
            <CardTitle>Kit de Prensa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Descarga nuestros recursos oficiales para medios de comunicación
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Logos Oficiales
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Imágenes de Productos
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Biografías Ejecutivos
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Datos de la Empresa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Press Releases */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Comunicados de Prensa</h2>
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(release.date).toLocaleDateString('es-ES')}
                        </span>
                        <Badge variant="secondary">{release.category}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{release.title}</h3>
                    <p className="text-muted-foreground">{release.excerpt}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Premios y Reconocimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {awards.map((award, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-medium mb-1">{award.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{award.organization}</p>
                  <Badge variant="outline">{award.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Contacto para Medios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Relaciones Públicas</h4>
                <p className="text-sm text-muted-foreground">María González</p>
                <p className="text-sm text-muted-foreground">Directora de Comunicaciones</p>
                <p className="text-sm text-muted-foreground">press@styleshop.com</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Consultas Comerciales</h4>
                <p className="text-sm text-muted-foreground">Carlos Ruiz</p>
                <p className="text-sm text-muted-foreground">Director Comercial</p>
                <p className="text-sm text-muted-foreground">business@styleshop.com</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4568</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}