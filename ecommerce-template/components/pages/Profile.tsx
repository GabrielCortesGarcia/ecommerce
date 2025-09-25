import { useState } from "react";
import { motion } from "motion/react";
import { User, Edit2, Save, X, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@email.com",
    phone: "+34 123 456 789",
    birthDate: "1990-05-15",
    address: "Calle Mayor 123",
    city: "Madrid",
    postalCode: "28001",
    country: "España",
    bio: "Amante de la moda sostenible y los estilos únicos."
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aquí normalmente se enviarían los datos al backend
    // console.log("Perfil actualizado:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Resetear cambios no guardados
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 py-8"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
          </div>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar y información básica */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="glass">
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                    <AvatarFallback className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      MG
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
                <CardTitle className="mt-4">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <p className="text-muted-foreground">{profileData.email}</p>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Cuéntanos sobre ti..."
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="text-center text-muted-foreground italic">
                    "{profileData.bio}"
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Información detallada */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  {isEditing ? (
                    <Input
                      id="birthDate"
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded-md">
                      {new Date(profileData.birthDate).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Dirección</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded-md">{profileData.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    {isEditing ? (
                      <Input
                        id="postalCode"
                        value={profileData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.postalCode}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">País</Label>
                    {isEditing ? (
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profileData.country}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}