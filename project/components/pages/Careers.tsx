import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Careers() {
  const jobs = [
    {
      title: "Frontend Developer",
      department: "Tecnología",
      location: "Remoto",
      type: "Tiempo completo",
      salary: "$70,000 - $90,000",
      description: "Únete a nuestro equipo para crear experiencias web excepcionales"
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Nueva York",
      type: "Tiempo completo",
      salary: "$60,000 - $80,000",
      description: "Lidera nuestras estrategias de marketing digital y growth"
    },
    {
      title: "UX Designer",
      department: "Diseño",
      location: "Remoto",
      type: "Tiempo completo",
      salary: "$65,000 - $85,000",
      description: "Diseña experiencias que enamoren a nuestros usuarios"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Carreras en StyleShop
        </h1>
        <p className="text-xl text-muted-foreground">
          Únete a nuestro equipo y ayúdanos a revolucionar la moda
        </p>
      </div>

      <Card className="glass mb-8">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Por qué trabajar con nosotros?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="font-medium">Crecimiento</h3>
              <p className="text-sm text-muted-foreground">Oportunidades de desarrollo profesional</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🏖️</div>
              <h3 className="font-medium">Balance</h3>
              <p className="text-sm text-muted-foreground">Horarios flexibles y trabajo remoto</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💝</div>
              <h3 className="font-medium">Beneficios</h3>
              <p className="text-sm text-muted-foreground">Seguro médico y descuentos exclusivos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Posiciones Abiertas</h2>
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass hover:shadow-glow transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-muted-foreground mb-3">{job.description}</p>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Aplicar
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.department}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {job.salary}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass mt-8">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold mb-2">¿No ves una posición que te interese?</h3>
          <p className="text-muted-foreground mb-4">
            Envíanos tu CV y te contactaremos cuando tengamos oportunidades que se ajusten a tu perfil
          </p>
          <Button variant="outline">Enviar CV Espontáneo</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}