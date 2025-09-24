import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Search,
  Filter,
  Download
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";
import { mockProducts, categories, brands } from "./mockData";

interface AdminPanelProps {
  onAddProduct?: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct?: (id: string, product: Partial<Product>) => void;
  onDeleteProduct?: (id: string) => void;
}

export default function AdminPanel({ onAddProduct, onUpdateProduct, onDeleteProduct }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    colors: [] as string[],
    sizes: [] as string[],
    rating: "4.0",
    reviewCount: "0",
    isNew: false,
    isOnSale: false
  });

  // Statistics
  const stats = {
    totalProducts: products.length,
    totalUsers: 1250,
    totalOrders: 3450,
    revenue: 125000
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      image: "",
      category: "",
      colors: [],
      sizes: [],
      rating: "4.0",
      reviewCount: "0",
      isNew: false,
      isOnSale: false
    });
    setEditingProduct(null);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        image: product.image,
        category: product.category,
        colors: product.colors || [],
        sizes: product.sizes || [],
        rating: product.rating.toString(),
        reviewCount: product.reviewCount.toString(),
        isNew: product.isNew || false,
        isOnSale: product.isOnSale || false
      });
    } else {
      resetForm();
    }
    setIsProductModalOpen(true);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Omit<Product, 'id'> = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      image: productForm.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop",
      category: productForm.category,
      colors: productForm.colors,
      sizes: productForm.sizes,
      rating: parseFloat(productForm.rating),
      reviewCount: parseInt(productForm.reviewCount),
      isNew: productForm.isNew,
      isOnSale: productForm.isOnSale
    };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...newProduct, id: editingProduct.id }
          : p
      );
      setProducts(updatedProducts);
      onUpdateProduct?.(editingProduct.id, newProduct);
    } else {
      // Add new product
      const productWithId = { ...newProduct, id: Date.now().toString() };
      setProducts(prev => [...prev, productWithId]);
      onAddProduct?.(newProduct);
    }

    setIsProductModalOpen(false);
    resetForm();
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      onDeleteProduct?.(productId);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) return;
    if (confirm(`¿Estás seguro de que quieres eliminar ${selectedProducts.length} productos?`)) {
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">Gestiona productos, pedidos y usuarios de StyleShop</p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-4 lg:grid-cols-4">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Analíticas
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: "Total Productos", value: stats.totalProducts, icon: Package, color: "text-blue-600" },
                { title: "Usuarios", value: stats.totalUsers, icon: Users, color: "text-green-600" },
                { title: "Pedidos", value: stats.totalOrders, icon: BarChart3, color: "text-purple-600" },
                { title: "Ingresos", value: `$${stats.revenue.toLocaleString()}`, icon: Settings, color: "text-orange-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Productos</CardTitle>
                    <CardDescription>Administra el catálogo de productos</CardDescription>
                  </div>
                  <Button 
                    onClick={() => handleOpenModal()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrar por categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.filter(cat => cat !== "Todos").map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedProducts.length > 0 && (
                    <Button variant="destructive" onClick={handleDeleteSelected}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar ({selectedProducts.length})
                    </Button>
                  )}
                </div>

                {/* Products Table */}
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-muted/50"
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProductSelection(product.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{product.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {product.isNew && <Badge>Nuevo</Badge>}
                              {product.isOnSale && <Badge variant="destructive">Oferta</Badge>}
                              {!product.isNew && !product.isOnSale && <Badge variant="outline">Normal</Badge>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span>{product.rating}</span>
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenModal(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
                    <p className="text-muted-foreground">Intenta ajustar los filtros o agregar un nuevo producto.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra los usuarios registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Gestión de usuarios</h3>
                  <p className="text-muted-foreground">Esta sección mostraría la lista de usuarios registrados.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Gestión de Pedidos</CardTitle>
                <CardDescription>Administra los pedidos de la tienda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Gestión de pedidos</h3>
                  <p className="text-muted-foreground">Esta sección mostraría la lista de pedidos realizados.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Product Modal */}
        <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmitProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del producto</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre del producto"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select 
                    value={productForm.category} 
                    onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== "Todos").map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Precio original (opcional)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de la imagen</Label>
                <Input
                  id="image"
                  value={productForm.image}
                  onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={productForm.rating}
                    onChange={(e) => setProductForm(prev => ({ ...prev, rating: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewCount">Número de reseñas</Label>
                  <Input
                    id="reviewCount"
                    type="number"
                    min="0"
                    value={productForm.reviewCount}
                    onChange={(e) => setProductForm(prev => ({ ...prev, reviewCount: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isNew"
                    checked={productForm.isNew}
                    onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, isNew: !!checked }))}
                  />
                  <Label htmlFor="isNew">Producto nuevo</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOnSale"
                    checked={productForm.isOnSale}
                    onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, isOnSale: !!checked }))}
                  />
                  <Label htmlFor="isOnSale">En oferta</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsProductModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  {editingProduct ? "Actualizar" : "Agregar"} Producto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}