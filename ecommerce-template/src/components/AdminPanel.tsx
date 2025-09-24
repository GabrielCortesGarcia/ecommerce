"use client";


import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Users,
  BarChart3,
} from "lucide-react";

import {
  Card,
  CardContent,
  
  CardTitle,
  CardDescription
} from "./ui/card";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "./ui/dialog";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: "Activo" | "Agotado" | "Normal";
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Producto 1", category: "Cat 1", stock: 20, price: 100, status: "Activo" },
    { id: 2, name: "Producto 2", category: "Cat 2", stock: 0, price: 150, status: "Agotado" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSave = () => {
    // Aquí agregas lógica de guardar o actualizar producto
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-6 h-6 text-blue-500" />
              <CardTitle className="text-lg font-bold">120</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Productos
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-6 h-6 text-green-500" />
              <CardTitle className="text-lg font-bold">80</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Clientes
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <CardTitle className="text-lg font-bold">150</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Ventas
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Botón agregar producto */}
      <div className="flex justify-end">
        <Button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="mr-2 w-4 h-4" />
          Agregar Producto
        </Button>
      </div>

      {/* Tabla de productos */}
      <div className="rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-muted/50">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Categoría</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Precio</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      product.status === "Activo"
                        ? "secondary"
                        : product.status === "Agotado"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {product.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal agregar/editar producto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? "Editar Producto" : "Agregar Producto"}
            </DialogTitle>
            <DialogDescription>
              Rellena los campos para {currentProduct ? "editar" : "agregar"} un producto
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input placeholder="Nombre" defaultValue={currentProduct?.name} />
            <Input placeholder="Categoría" defaultValue={currentProduct?.category} />
            <Input placeholder="Stock" type="number" defaultValue={currentProduct?.stock} />
            <Input placeholder="Precio" type="number" defaultValue={currentProduct?.price} />
            <Textarea placeholder="Descripción" defaultValue={currentProduct?.name} />
          </div>

          <DialogFooter>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              {currentProduct ? "Actualizar" : "Agregar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}