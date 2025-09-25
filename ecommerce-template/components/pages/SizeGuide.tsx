import { motion } from "motion/react";
import { Ruler, User, Users, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function SizeGuide() {
  const womenSizes = [
    { size: "XS", chest: "81-84", waist: "61-64", hips: "86-89" },
    { size: "S", chest: "86-89", waist: "66-69", hips: "91-94" },
    { size: "M", chest: "91-94", waist: "71-74", hips: "96-99" },
    { size: "L", chest: "96-99", waist: "76-79", hips: "101-104" },
    { size: "XL", chest: "101-104", waist: "81-84", hips: "106-109" },
    { size: "XXL", chest: "106-109", waist: "86-89", hips: "111-114" }
  ];

  const menSizes = [
    { size: "XS", chest: "86-89", waist: "71-74", hips: "89-92" },
    { size: "S", chest: "91-94", waist: "76-79", hips: "94-97" },
    { size: "M", chest: "96-99", waist: "81-84", hips: "99-102" },
    { size: "L", chest: "101-104", waist: "86-89", hips: "104-107" },
    { size: "XL", chest: "106-109", waist: "91-94", hips: "109-112" },
    { size: "XXL", chest: "111-114", waist: "96-99", hips: "114-117" }
  ];

  const kidsSizes = [
    { size: "2-3 años", height: "92-98", chest: "52-54", waist: "50-52" },
    { size: "4-5 años", height: "104-110", chest: "56-58", waist: "52-54" },
    { size: "6-7 años", height: "116-122", chest: "60-62", waist: "54-56" },
    { size: "8-9 años", height: "128-134", chest: "64-66", waist: "56-58" },
    { size: "10-11 años", height: "140-146", chest: "68-70", waist: "58-60" },
    { size: "12-13 años", height: "152-158", chest: "72-74", waist: "60-62" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Ruler className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Guía de Tallas
        </h1>
        <p className="text-xl text-muted-foreground">
          Encuentra tu talla perfecta con nuestras medidas detalladas
        </p>
      </div>

      {/* Measurement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="glass bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📏 Cómo Medir Correctamente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-1">Pecho/Busto</h4>
                <p className="text-sm text-muted-foreground">
                  Mide alrededor de la parte más ancha del pecho
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-1">Cintura</h4>
                <p className="text-sm text-muted-foreground">
                  Mide en la parte más estrecha de la cintura
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-1">Cadera</h4>
                <p className="text-sm text-muted-foreground">
                  Mide alrededor de la parte más ancha de las caderas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Size Tables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass">
          <CardContent className="p-6">
            <Tabs defaultValue="women" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="women" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Mujer
                </TabsTrigger>
                <TabsTrigger value="men" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Hombre
                </TabsTrigger>
                <TabsTrigger value="kids" className="flex items-center gap-2">
                  <Baby className="h-4 w-4" />
                  Niños
                </TabsTrigger>
              </TabsList>

              <TabsContent value="women" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tallas de Mujer</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas las medidas están en centímetros
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Talla</TableHead>
                        <TableHead>Pecho/Busto</TableHead>
                        <TableHead>Cintura</TableHead>
                        <TableHead>Cadera</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {womenSizes.map((size) => (
                        <TableRow key={size.size}>
                          <TableCell className="font-medium">{size.size}</TableCell>
                          <TableCell>{size.chest} cm</TableCell>
                          <TableCell>{size.waist} cm</TableCell>
                          <TableCell>{size.hips} cm</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="men" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tallas de Hombre</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas las medidas están en centímetros
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Talla</TableHead>
                        <TableHead>Pecho</TableHead>
                        <TableHead>Cintura</TableHead>
                        <TableHead>Cadera</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menSizes.map((size) => (
                        <TableRow key={size.size}>
                          <TableCell className="font-medium">{size.size}</TableCell>
                          <TableCell>{size.chest} cm</TableCell>
                          <TableCell>{size.waist} cm</TableCell>
                          <TableCell>{size.hips} cm</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="kids" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tallas Infantiles</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas las medidas están en centímetros
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Edad</TableHead>
                        <TableHead>Altura</TableHead>
                        <TableHead>Pecho</TableHead>
                        <TableHead>Cintura</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {kidsSizes.map((size) => (
                        <TableRow key={size.size}>
                          <TableCell className="font-medium">{size.size}</TableCell>
                          <TableCell>{size.height} cm</TableCell>
                          <TableCell>{size.chest} cm</TableCell>
                          <TableCell>{size.waist} cm</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">💡 Consejos Útiles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <p className="text-sm">Mide siempre sobre ropa interior ligera</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <p className="text-sm">Usa una cinta métrica flexible</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <p className="text-sm">No aprietes demasiado la cinta</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <p className="text-sm">Si estás entre tallas, elige la mayor</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">🔄 Política de Cambios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Si la talla no te queda perfecta, puedes cambiarla:
            </p>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-sm">30 días para cambios</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-sm">Producto en condiciones originales</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-sm">Cambio gratuito por primera vez</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}