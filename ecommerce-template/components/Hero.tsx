import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowRight, Sparkles, Star, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onOffersClick?: () => void;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export default function Hero({
  title = "Nueva Colección Primavera 2024",
  subtitle = "Descubre las últimas tendencias en moda con estilos únicos que definen tu personalidad",
  ctaText = "Explorar Colección",
  onCtaClick,
  onOffersClick,
  backgroundImage,
  overlayOpacity = 0.4
}: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background with Parallax */}
      <motion.div 
        className="absolute inset-0 parallax"
        style={{ 
          y: backgroundY,
        }}
      >
        {backgroundImage ? (
          <ImageWithFallback
            src={backgroundImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        ) : (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 animate-gradient"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 360],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="w-6 h-6 text-white/40" />
            ) : i % 3 === 1 ? (
              <Star className="w-5 h-5 text-yellow-300/50 fill-yellow-300/30" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-blue-300/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Overlay with Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content with Parallax */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        style={{ y: textY }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm">Nueva Colección Disponible</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 shadow-glow group-hover:shadow-glow-lg transition-all duration-300"
              onClick={onCtaClick}
            >
              <motion.span
                initial={false}
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="glass border-white/30 text-white hover:bg-white/10 px-8 backdrop-blur-sm transition-all duration-300"
              onClick={onOffersClick}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Ver Ofertas
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80"
        >
          {[
            { title: "Envío Gratis", desc: "En compras mayores a $100" },
            { title: "30 Días", desc: "Garantía de devolución" },
            { title: "24/7 Soporte", desc: "Atención al cliente" }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center glass rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-2xl font-bold mb-2">{feature.title}</div>
              <p className="text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-float"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
}