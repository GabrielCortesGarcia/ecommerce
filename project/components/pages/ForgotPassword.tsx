import { useState } from "react";
import { motion } from "motion/react";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un email válido");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass text-center">
          <CardContent className="pt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">¡Email Enviado!</h2>
            <p className="text-muted-foreground mb-6">
              Hemos enviado las instrucciones para restablecer tu contraseña a:
            </p>
            <p className="font-medium text-blue-600 mb-6">{email}</p>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Revisa tu bandeja de entrada y la carpeta de spam. El enlace será válido por 24 horas.
              </p>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a intentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="glass">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          </motion.div>
          
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ¿Olvidaste tu contraseña?
          </CardTitle>
          <p className="text-muted-foreground">
            No te preocupes, te ayudamos a recuperar el acceso a tu cuenta
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar instrucciones"}
              </Button>
            </motion.div>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Recibirás un email con un enlace para crear una nueva contraseña
              </p>
              
              <div className="flex items-center justify-center space-x-1 text-sm">
                <span className="text-muted-foreground">¿Recordaste tu contraseña?</span>
                <button 
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => window.history.back()}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Consejos de seguridad:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• El enlace expirará en 24 horas</li>
              <li>• Revisa la carpeta de spam si no lo ves</li>
              <li>• Crea una contraseña segura con al menos 8 caracteres</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}