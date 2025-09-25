# StyleShop - E-commerce Completo de Ropa

Un e-commerce moderno y completo desarrollado con React, TypeScript y Tailwind CSS, diseñado específicamente para tiendas de ropa con categorías de género (Mujer, Hombre, Niños), sistema de favoritos, carrito de compras y panel de administración.

## ✨ Características Principales

### 🛍️ Funcionalidades de E-commerce
- **Catálogo de productos** con filtros avanzados por categoría, género, precio, tallas, colores y rating
- **Sistema de carrito** con gestión de cantidades y variantes de productos
- **Sistema de favoritos** sincronizado con el estado global
- **Búsqueda en tiempo real** por nombre y categoría
- **Páginas de detalle** de productos con galería de imágenes
- **Filtro de ofertas** con indicador visual especial

### 👥 Gestión de Usuarios
- **Sistema de autenticación** con login/registro
- **Perfil de usuario** completo con gestión de datos
- **Historial de pedidos** y seguimiento
- **Lista de favoritos** personalizada
- **Configuración de cuenta** y preferencias

### 🎯 Categorización por Género
- **Sección Mujer** con productos específicos
- **Sección Hombre** con productos específicos  
- **Sección Niños** with productos infantiles
- **Filtros automáticos** por categoría de género
- **Navegación intuitiva** por secciones

### 🎨 Diseño y UX
- **Diseño responsivo** optimizado para móvil y desktop
- **Animaciones fluidas** con Motion (Framer Motion)
- **Efectos parallax** y scroll animations
- **Tema de colores azul** consistente en toda la aplicación
- **Componentes reutilizables** con shadcn/ui

### ⚡ Funcionalidades Avanzadas
- **Panel de administración** completo para gestión de productos
- **Chat de soporte** integrado
- **Páginas legales** y de información
- **Sistema de newsletter** 
- **Burbuja de chat** para atención al cliente

## 🚀 Tecnologías Utilizadas

### Frontend Core
- **React 18** - Biblioteca principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS v4** - Framework de estilos

### Animaciones y UX
- **Motion (Framer Motion)** - Animaciones y transiciones
- **Lucide React** - Iconografía moderna
- **React Hook Form** - Gestión de formularios

### Componentes UI
- **shadcn/ui** - Sistema de componentes
- **Radix UI** - Componentes primitivos accesibles
- **Recharts** - Gráficos y analíticas
- **Sonner** - Notificaciones toast

### Estado y Datos
- **Context API** - Gestión de estado global
- **LocalStorage** - Persistencia de favoritos y carrito
- **Mock Data** - Datos de ejemplo estructurados

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd styleshop-ecommerce

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Construcción
npm run build        # Construir para producción
npm run preview      # Preview de la construcción

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint automáticamente
npm run type-check   # Verificar tipos de TypeScript
npm run format       # Formatear código con Prettier

# Utilidades
npm run clean        # Limpiar directorio dist
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── pages/              # Páginas de la aplicación
│   ├── figma/              # Componentes de Figma
│   ├── AdminPanel.tsx      # Panel de administración
│   ├── AuthContext.tsx     # Context de autenticación
│   ├── AuthModal.tsx       # Modal de login/registro
│   ├── CategoryFilter.tsx  # Filtros de productos
│   ├── ChatSupport.tsx     # Chat de soporte
│   ├── Footer.tsx          # Footer con enlaces
│   ├── Hero.tsx            # Sección hero principal
│   ├── Navbar.tsx          # Barra de navegación
│   ├── PageRouter.tsx      # Enrutador de páginas
│   ├── ProductCard.tsx     # Tarjeta de producto
│   ├── ProductDetails.tsx  # Detalles de producto
│   ├── ProductGrid.tsx     # Grid de productos
│   ├── ShoppingCart.tsx    # Carrito de compras
│   └── mockData.ts         # Datos de ejemplo
├── styles/
│   └── globals.css         # Estilos globales y variables CSS
├── App.tsx                 # Componente principal
└── package.json            # Configuración del proyecto
```

## 🔧 Configuración de Producción

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```bash
# API Configuration
VITE_API_URL=https://api.yourstore.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Other services
VITE_CHAT_WIDGET_ID=your_chat_widget_id
```

### Deployment
```bash
# Construir para producción
npm run build

# Los archivos estáticos estarán en /dist
```

### Optimizaciones Incluidas
- **Code splitting** automático
- **Tree shaking** para reducir bundle size
- **Imágenes optimizadas** con fallbacks
- **Lazy loading** de componentes
- **Caché de assets** estáticos

## 🎨 Personalización

### Colores y Tema
Los colores principales se pueden modificar en `/styles/globals.css`:

```css
:root {
  --primary: #3b82f6;        /* Azul principal */
  --secondary: #f3f4f6;      /* Gris secundario */
  /* Otros colores... */
}
```

### Componentes
Todos los componentes están diseñados para ser reutilizables y personalizables a través de props y variantes de Tailwind CSS.

### Animaciones
Las animaciones se pueden ajustar modificando los parámetros en los componentes que usan Motion.

## 📱 Páginas Incluidas

### Principales
- **Inicio** - Hero, productos destacados, categorías
- **Productos** - Catálogo completo con filtros
- **Detalle de Producto** - Información completa y opciones
- **Carrito** - Gestión de compras
- **Favoritos** - Productos guardados

### Por Género
- **Mujer** - Productos femeninos
- **Hombre** - Productos masculinos  
- **Niños** - Productos infantiles
- **Accesorios** - Complementos y accesorios

### Usuario
- **Mi Perfil** - Información personal
- **Mis Pedidos** - Historial de compras
- **Configuración** - Preferencias
- **Favoritos** - Lista de productos guardados

### Información
- **Contacto** - Formulario y datos
- **Guía de Tallas** - Información de medidas
- **Envío y Devoluciones** - Políticas
- **FAQ** - Preguntas frecuentes
- **Términos y Condiciones** - Legales
- **Política de Privacidad** - GDPR compliant

### Administración
- **Panel Admin** - Gestión completa de productos
- **Analíticas** - Estadísticas de ventas
- **Usuarios** - Gestión de clientes
- **Pedidos** - Administración de compras

## 🚀 Funcionalidades del Admin

### Gestión de Productos
- ✅ **Crear productos** con todos los campos necesarios
- ✅ **Editar productos** existentes
- ✅ **Eliminar productos** individualmente o en lote
- ✅ **Asignar género** (Mujer, Hombre, Niños, Unisex)
- ✅ **Gestión de categorías** y filtros
- ✅ **Subida de imágenes** con preview
- ✅ **Control de stock** y precios

### Panel de Control
- 📊 **Estadísticas generales** de productos, usuarios y ventas
- 🔍 **Búsqueda y filtros** avanzados
- 📋 **Tabla de productos** con todas las opciones
- ✅ **Selección múltiple** para operaciones en lote
- 🎨 **Interfaz moderna** con animaciones

## 🌟 Características Especiales

### Sistema de Favoritos
- ❤️ **Botón de favorito** en cada producto
- 🔄 **Sincronización** con estado global
- 💾 **Persistencia** en localStorage
- 📱 **Página dedicada** de favoritos

### Filtros Avanzados
- 🏷️ **Por categoría** de producto
- 👥 **Por género** (Mujer/Hombre/Niños)
- 💰 **Por rango de precio** con slider
- 📏 **Por tallas** disponibles
- 🎨 **Por colores** con picker visual
- ⭐ **Por rating** mínimo
- 🔥 **Modo ofertas** especial

### Animaciones y UX
- ✨ **Efectos parallax** en scroll
- 🎭 **Transiciones fluidas** entre páginas
- 📱 **Gestos móviles** optimizados
- 🌊 **Elementos flotantes** decorativos
- 💫 **Micro-interacciones** en botones

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte y preguntas:
- 📧 Email: support@styleshop.com
- 💬 Chat: Disponible en la aplicación
- 📖 Documentación: [docs.styleshop.com](docs.styleshop.com)

---

Desarrollado con ❤️ por el equipo de StyleShop