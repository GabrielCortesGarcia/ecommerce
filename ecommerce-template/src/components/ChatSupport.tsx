import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageCircle, 
  X, 
  Send,  
  Bot, 
  Minimize2, 
  Maximize2,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! 👋 Soy el asistente virtual de StyleShop. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Estado de mi pedido",
    "Información de envío",
    "Política de devoluciones",
    "Guía de tallas",
    "Hablar con un agente"
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("pedido") || lowerMessage.includes("orden")) {
      return "Para consultar el estado de tu pedido, necesito tu número de orden. Puedes encontrarlo en el email de confirmación que recibiste. 📧";
    }
    
    if (lowerMessage.includes("envío") || lowerMessage.includes("envio")) {
      return "Ofrecemos envío gratuito en pedidos superiores a $100. Los tiempos de entrega son de 3-5 días hábiles. 🚚";
    }
    
    if (lowerMessage.includes("devolucion") || lowerMessage.includes("cambio")) {
      return "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los productos deben estar en condiciones originales. 🔄";
    }
    
    if (lowerMessage.includes("talla") || lowerMessage.includes("tamaño")) {
      return "Puedes consultar nuestra guía de tallas haciendo clic en 'Guía de Tallas' en cada producto. ¿Necesitas ayuda con algún producto específico? 📏";
    }
    
    if (lowerMessage.includes("agente") || lowerMessage.includes("humano")) {
      return "Te conectaré con un agente humano. El tiempo de espera estimado es de 2-3 minutos. ¿Puedes contarme brevemente tu consulta? 👨‍💼";
    }
    
    if (lowerMessage.includes("precio") || lowerMessage.includes("descuento")) {
      return "Tenemos ofertas especiales en nuestra sección Sale con descuentos de hasta 70%. ¡También puedes suscribirte al newsletter para ofertas exclusivas! 💰";
    }
    
    if (lowerMessage.includes("hola") || lowerMessage.includes("hi")) {
      return "¡Hola! 😊 Estoy aquí para ayudarte con cualquier pregunta sobre StyleShop. ¿Qué necesitas saber?";
    }
    
    return "Entiendo tu consulta. Si necesitas ayuda más específica, puedo conectarte con un agente humano o puedes usar nuestras opciones rápidas abajo. 🤝";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-glow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        {/* Notification badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-xs text-white font-bold">1</span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        height: isMinimized ? "auto" : "500px"
      }}
      className="fixed bottom-6 right-6 z-50 w-80"
    >
      <Card className="glass border-0 shadow-glow">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm">StyleShop Support</CardTitle>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  En línea
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="p-3 border-t bg-gray-50">
                  <p className="text-xs text-muted-foreground mb-2">Respuestas rápidas:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs h-6 px-2"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="text-sm"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-8 w-8 bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="p-3 bg-gray-50 rounded-b-lg">
                  <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                      <Phone className="h-3 w-3" />
                      Llamar
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                      <Mail className="h-3 w-3" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}