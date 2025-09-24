import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export default function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Términos de Servicio
          </CardTitle>
          <p className="text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Aceptación de Términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar StyleShop, usted acepta estar sujeto a estos Términos de Servicio 
              y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos 
              términos, se le prohíbe usar este sitio.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Uso del Sitio Web</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Este sitio web está destinado para uso personal y no comercial. Usted se compromete a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>Proporcionar información precisa y actualizada</li>
              <li>Mantener la confidencialidad de su cuenta</li>
              <li>No utilizar el sitio para actividades ilegales</li>
              <li>Respetar los derechos de propiedad intelectual</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Productos y Precios</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar precios sin previo aviso. Los precios mostrados 
              incluyen impuestos aplicables. La disponibilidad de productos está sujeta a existencias.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Pedidos y Pagos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos los pedidos están sujetos a aceptación. Nos reservamos el derecho de rechazar 
              cualquier pedido. El pago debe realizarse al momento de la compra mediante los métodos 
              de pago aceptados.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Envíos y Entregas</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los tiempos de entrega son estimados y pueden variar. No nos hacemos responsables por 
              retrasos causados por circunstancias fuera de nuestro control.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Devoluciones y Cambios</h2>
            <p className="text-muted-foreground leading-relaxed">
              Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que los 
              productos estén en condiciones originales. Los gastos de envío para devoluciones corren 
              por cuenta del cliente, excepto en casos de productos defectuosos.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Privacidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Su privacidad es importante para nosotros. Consulte nuestra Política de Privacidad para 
              obtener información sobre cómo recopilamos, utilizamos y protegemos sus datos personales.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              StyleShop no será responsable por daños indirectos, incidentales o consecuentes que 
              resulten del uso de nuestros productos o servicios.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las 
              modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
            </p>
            <div className="mt-3 p-4 bg-blue-50 rounded-lg">
              <p className="font-medium">StyleShop</p>
              <p className="text-sm text-muted-foreground">Email: legal@styleshop.com</p>
              <p className="text-sm text-muted-foreground">Teléfono: +1 (555) 123-4567</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}