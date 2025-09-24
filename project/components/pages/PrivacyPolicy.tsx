import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Shield, Lock, Eye, Users } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Política de Privacidad
            </CardTitle>
          </div>
          <p className="text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Datos Seguros</h3>
              <p className="text-sm text-muted-foreground">Encriptación de extremo a extremo</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Transparencia</h3>
              <p className="text-sm text-muted-foreground">Control total sobre tus datos</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">No Compartimos</h3>
              <p className="text-sm text-muted-foreground">Tus datos son solo tuyos</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Información que Recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Recopilamos información para brindarle un mejor servicio:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium">Información Personal</h4>
                <p className="text-sm text-muted-foreground">Nombre, email, dirección, teléfono</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium">Información de Pago</h4>
                <p className="text-sm text-muted-foreground">Datos de tarjetas (procesados de forma segura)</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium">Datos de Navegación</h4>
                <p className="text-sm text-muted-foreground">Cookies, preferencias, historial de compras</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Cómo Utilizamos su Información</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Utilizamos su información para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>Procesar y gestionar sus pedidos</li>
              <li>Comunicarnos sobre el estado de sus compras</li>
              <li>Personalizar su experiencia de compra</li>
              <li>Enviar promociones y ofertas (con su consentimiento)</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Compartir Información</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              No vendemos ni alquilamos su información personal. Podemos compartir datos con:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>Proveedores de servicios de envío</li>
              <li>Procesadores de pagos</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Cookies y Tecnologías Similares</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies para mejorar su experiencia de navegación, recordar sus preferencias 
              y analizar el uso del sitio. Puede controlar las cookies a través de la configuración 
              de su navegador.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Seguridad de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos 
              personales contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
            <div className="mt-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm">
                🔒 Todos los datos de pago son procesados de forma segura mediante conexiones SSL encriptadas.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Sus Derechos</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Usted tiene derecho a:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium">Acceso</h4>
                <p className="text-sm text-muted-foreground">Ver qué información tenemos sobre usted</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium">Rectificación</h4>
                <p className="text-sm text-muted-foreground">Corregir información incorrecta</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-medium">Eliminación</h4>
                <p className="text-sm text-muted-foreground">Solicitar la eliminación de sus datos</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium">Portabilidad</h4>
                <p className="text-sm text-muted-foreground">Obtener una copia de sus datos</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Retención de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos su información personal durante el tiempo necesario para cumplir con los 
              propósitos descritos en esta política, a menos que la ley requiera un período de 
              retención más largo.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Cambios en Esta Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre 
              cambios significativos por email o mediante un aviso prominente en nuestro sitio web.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Para preguntas sobre esta política de privacidad o para ejercer sus derechos:
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-medium">Oficial de Protección de Datos</p>
              <p className="text-sm text-muted-foreground">Email: privacy@styleshop.com</p>
              <p className="text-sm text-muted-foreground">Teléfono: +1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Dirección: 123 Fashion St, Style City, SC 12345</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}