import { Product } from "./ProductCard";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica de Algodón",
    price: 25.99,
    originalPrice: 35.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    category: "Camisetas",
    colors: ["#000000", "#FFFFFF", "#FF6B6B", "#4ECDC4"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isOnSale: true
  },
  {
    id: "2",
    name: "Jeans Skinny Fit",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    rating: 4.3,
    reviewCount: 95,
    category: "Pantalones",
    colors: ["#1E3A8A", "#000000", "#374151"],
    sizes: ["28", "30", "32", "34", "36"],
    isNew: false,
    isOnSale: false
  },
  {
    id: "3",
    name: "Vestido Floral de Verano",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
    rating: 4.7,
    reviewCount: 203,
    category: "Vestidos",
    colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isOnSale: false
  },
  {
    id: "4",
    name: "Chaqueta de Cuero",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    rating: 4.8,
    reviewCount: 67,
    category: "Chaquetas",
    colors: ["#000000", "#8B4513"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isOnSale: true
  },
  {
    id: "5",
    name: "Sneakers Deportivos",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    rating: 4.4,
    reviewCount: 156,
    category: "Zapatos",
    colors: ["#FFFFFF", "#000000", "#FF6B6B"],
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    isNew: true,
    isOnSale: false
  },
  {
    id: "6",
    name: "Bolso de Mano Elegante",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    category: "Accesorios",
    colors: ["#000000", "#8B4513", "#DC143C"],
    sizes: [],
    isNew: false,
    isOnSale: true
  },
  {
    id: "7",
    name: "Suéter de Lana Merino",
    price: 95.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    rating: 4.5,
    reviewCount: 74,
    category: "Suéteres",
    colors: ["#8B4513", "#000000", "#FFFFFF", "#FF6B6B"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isOnSale: false
  },
  {
    id: "8",
    name: "Falda Midi Plisada",
    price: 55.99,
    originalPrice: 75.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d81?w=400&h=500&fit=crop",
    rating: 4.2,
    reviewCount: 112,
    category: "Faldas",
    colors: ["#000000", "#FF6B6B", "#4ECDC4"],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isOnSale: true
  },
  {
    id: "9",
    name: "Camisa de Lino Blanca",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    rating: 4.4,
    reviewCount: 98,
    category: "Camisas",
    colors: ["#FFFFFF", "#E6F3FF", "#FFE6E6"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isOnSale: false
  },
  {
    id: "10",
    name: "Pantalones Chinos",
    price: 65.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    rating: 4.3,
    reviewCount: 85,
    category: "Pantalones",
    colors: ["#8B4513", "#000000", "#006400"],
    sizes: ["28", "30", "32", "34", "36"],
    isNew: false,
    isOnSale: false
  },
  {
    id: "11",
    name: "Botas de Montaña",
    price: 139.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
    rating: 4.7,
    reviewCount: 134,
    category: "Zapatos",
    colors: ["#8B4513", "#000000"],
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    isNew: false,
    isOnSale: true
  },
  {
    id: "12",
    name: "Reloj Deportivo",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
    rating: 4.8,
    reviewCount: 245,
    category: "Accesorios",
    colors: ["#000000", "#C0C0C0", "#FFD700"],
    sizes: [],
    isNew: true,
    isOnSale: false
  }
];

export const categories = [
  "Todos",
  "Camisetas", 
  "Pantalones", 
  "Vestidos", 
  "Zapatos", 
  "Accesorios", 
  "Chaquetas",
  "Suéteres",
  "Faldas",
  "Camisas"
];

export const brands = [
  "Nike",
  "Adidas", 
  "Zara",
  "H&M",
  "Pull & Bear",
  "Bershka",
  "Mango",
  "Stradivarius"
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const colors = [
  { name: "Negro", value: "#000000" },
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Azul", value: "#0066CC" },
  { name: "Rojo", value: "#FF6B6B" },
  { name: "Verde", value: "#4ECDC4" },
  { name: "Rosa", value: "#FFB3BA" },
  { name: "Marrón", value: "#8B4513" },
  { name: "Gris", value: "#808080" }
];