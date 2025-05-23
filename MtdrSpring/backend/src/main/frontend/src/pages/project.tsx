import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// Define la interfaz para los proyectos
interface Proyecto {
  idProyecto: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string; // Si es una fecha en formato ISO, usa string
  estado: string;
}

export default function Project() {
  const [projects, setProjects] = useState<Proyecto[]>([]); // Usa la interfaz aquí

  useEffect(() => {
    // Fetch data from el backend
    fetch("http://localhost:8080/proyect") // Cambia el puerto si es necesario
      .then((response) => response.json())
      .then((data: Proyecto[]) => setProjects(data)) // Especifica el tipo de los datos
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.idProyecto} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              {/* nombre del proyecto */}
              <h2 className="text-2xl font-bold">{project.nombre}</h2>
              <div className="flex space-x-3">
                <span className="bg-red-100 text-red-600 px-4 py-1 rounded-md text-sm">
                  {project.estado}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6"></div>
            {/* descripcion del proyecto */}
            <p className="text-gray-700 mb-8">{project.descripcion}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock stroke="red" size={18} />
                {/* creacion */}
                <span className="text-red-500 font-medium">
                  {new Date(project.fechaInicio).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination opcional */}
      <div className="flex justify-center mt-8 fixed bottom-0 left-[15%] right-0 p-4 shadow-md">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded text-gray-500 hover:text-gray-700">Previous</button>
          <button className="px-3 py-1 rounded bg-red-600 text-white">1</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">2</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">3</button>
          <button className="px-3 py-1 rounded text-gray-500 hover:text-gray-700">Next</button>
        </nav>
      </div>
    </div>
  );
}
