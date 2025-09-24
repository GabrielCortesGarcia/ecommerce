import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useAuth } from "./AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
  onNavigate?: (page: string) => void;
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login", onNavigate }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (isRegisterForm: boolean = false) => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (isRegisterForm) {
      if (!formData.name) {
        newErrors.name = "El nombre es requerido";
      } else if (formData.name.length < 2) {
        newErrors.name = "El nombre debe tener al menos 2 caracteres";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirma tu contraseña";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        onClose();
        setFormData({ email: "", password: "", name: "", confirmPassword: "" });
      } else {
        setErrors({ general: "Email o contraseña incorrectos" });
      }
    } catch (error) {
      setErrors({ general: "Error al iniciar sesión" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    setIsLoading(true);
    try {
      const success = await register(formData.email, formData.password, formData.name);
      if (success) {
        onClose();
        setFormData({ email: "", password: "", name: "", confirmPassword: "" });
      } else {
        setErrors({ general: "Error al crear la cuenta" });
      }
    } catch (error) {
      setErrors({ general: "Error al registrarse" });
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    unfocused: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass border-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenido a StyleShop
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {errors.general && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded"
                  >
                    {errors.general}
                  </motion.div>
                )}

                <motion.div variants={inputVariants} whileFocus="focused" className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                </motion.div>

                <motion.div variants={inputVariants} whileFocus="focused" className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </motion.div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate?.("forgot-password");
                    }}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {errors.general && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded"
                  >
                    {errors.general}
                  </motion.div>
                )}

                <motion.div variants={inputVariants} whileFocus="focused" className="space-y-2">
                  <Label htmlFor="register-name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                </motion.div>

                <motion.div variants={inputVariants} whileFocus="focused" className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                </motion.div>

                <motion.div variants={inputVariants} whileFocus="focused" className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                </motion.div>

                <motion.div variants={inputVariants} whileFocus="focused" className="space-y-2">
                  <Label htmlFor="register-confirm">Confirmar contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword}</p>}
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center">
                  Al registrarte, aceptas nuestros{" "}
                  <a href="#" className="text-primary hover:underline">
                    Términos de Servicio
                  </a>{" "}
                  y{" "}
                  <a href="#" className="text-primary hover:underline">
                    Política de Privacidad
                  </a>
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Demo: admin@styleshop.com / admin123 para acceder como administrador
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

//corregir