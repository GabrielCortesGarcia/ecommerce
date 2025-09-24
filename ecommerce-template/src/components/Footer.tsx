import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface FooterProps {
  onNewsletterSubmit?: (email: string) => void;
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNewsletterSubmit, onNavigate }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    onNewsletterSubmit?.(email);
  };

  return (
    <footer className="bg-background border-t">
      {/* Newsletter Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Mantente al día con las últimas tendencias
            </h3>
            <p className="text-muted-foreground mb-6">
              Suscríbete a nuestro newsletter y recibe ofertas exclusivas, nuevos lanzamientos y tips de moda.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Tu email"
                className="flex-1"
                required
              />
              <Button type="submit">Suscribirse</Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-2">
              Al suscribirte, aceptas recibir emails promocionales. Puedes darte de baja en cualquier momento.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">StyleShop</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda de moda favorita. Ofrecemos las últimas tendencias con la mejor calidad y precios accesibles.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Av. Principal 123, Ciudad</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>hola@styleshop.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Tienda</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mujer
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Hombre
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Niños
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Accesorios
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sale
              </a>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Atención al Cliente</h4>
            <nav className="space-y-2">
              <button onClick={() => onNavigate?.("contact")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Contacto
              </button>
              <button onClick={() => onNavigate?.("size-guide")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Guía de Tallas
              </button>
              <button onClick={() => onNavigate?.("shipping-returns")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Envíos y Devoluciones
              </button>
              <button onClick={() => onNavigate?.("faq")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Preguntas Frecuentes
              </button>
              <button onClick={() => onNavigate?.("order-status")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Estado del Pedido
              </button>
            </nav>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <nav className="space-y-2">
              <button onClick={() => onNavigate?.("about")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Sobre Nosotros
              </button>
              <button onClick={() => onNavigate?.("careers")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Carreras
              </button>
              <button onClick={() => onNavigate?.("sustainability")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Sostenibilidad
              </button>
              <button onClick={() => onNavigate?.("press")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Prensa
              </button>
              <button onClick={() => onNavigate?.("affiliates")} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                Programa de Afiliados
              </button>
            </nav>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2024 StyleShop. Todos los derechos reservados.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4 text-sm">
            <button onClick={() => onNavigate?.("privacy")} className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidad
            </button>
            <button onClick={() => onNavigate?.("terms")} className="text-muted-foreground hover:text-foreground transition-colors">
              Términos de Servicio
            </button>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              Métodos de pago aceptados:
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-white rounded border">VISA</span>
                <span className="px-2 py-1 bg-white rounded border">MASTERCARD</span>
                <span className="px-2 py-1 bg-white rounded border">AMEX</span>
                <span className="px-2 py-1 bg-white rounded border">PAYPAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}