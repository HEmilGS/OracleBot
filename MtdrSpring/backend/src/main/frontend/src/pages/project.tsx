import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// Define la interfaz para los proyectos
interface Proyecto {
  idProyecto: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string; // Si es una fecha en formato ISO, usa string
  fechaFin: string; // Agregado para evitar el error
  estado: string;
}

export default function Project() {
  const [projects, setProjects] = useState<Proyecto[]>([]); // Usa la interfaz aquí

  useEffect(() => {
    // Fetch data from el backend
    fetch("http://localhost:8081/api/proyect") // Cambia el puerto si es necesario
      .then((response) => response.json())
      .then((data: Proyecto[]) => setProjects(data)) // Especifica el tipo de los datos
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  function handleToggleEstadoProyecto(project: Proyecto) {
    const nuevoEstado = project.estado === "Pendiente" ? "Finalizado" : "Pendiente";
    const actualizado = { ...project, estado: nuevoEstado };
    fetch(`http://localhost:8081/api/proyect/${project.idProyecto}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actualizado),
    })
      .then((res) => {
        if (res.ok) {
          setProjects((prev) =>
            prev.map((p) =>
              p.idProyecto === project.idProyecto ? { ...p, estado: nuevoEstado } : p
            )
          );
        } else {
          alert("Error al actualizar el proyecto");
        }
      })
      .catch(() => alert("Error de red al actualizar el proyecto"));
  }

  // Estado para mostrar el modal y para el nuevo proyecto
  const [showModal, setShowModal] = useState(false);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "Pendiente",
  });

  // Función para manejar el envío del formulario
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/proyect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProyecto),
      });
      if (res.ok) {
        setShowModal(false);
        setNuevoProyecto({
          nombre: "",
          descripcion: "",
          fechaInicio: "",
          fechaFin: "",
          estado: "Pendiente",
        });
        // Recarga la lista
        const data = await res.json();
        setProjects((prev) => [...prev, data]);
      } else {
        alert("Error al agregar el proyecto");
      }
    } catch {
      alert("Error de red al agregar el proyecto");
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Botón para abrir el modal */}
      <button
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => setShowModal(true)}
      >
        Agregar Proyecto
      </button>

      {/* Modal para agregar proyecto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
            onSubmit={handleAddProject}
          >
            <h2 className="text-xl font-bold mb-4">Nuevo Proyecto</h2>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Nombre"
              value={nuevoProyecto.nombre}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, nombre: e.target.value })}
              required
            />
            <textarea
              className="w-full mb-2 p-2 border rounded"
              placeholder="Descripción"
              value={nuevoProyecto.descripcion}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcion: e.target.value })}
              required
            />
            <label className="block mb-1">Fecha Inicio</label>
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded"
              value={nuevoProyecto.fechaInicio}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, fechaInicio: e.target.value })}
              required
            />
            <label className="block mb-1">Fecha Fin</label>
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded"
              value={nuevoProyecto.fechaFin}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, fechaFin: e.target.value })}
              required
            />
            <label className="block mb-1">Estado</label>
            <select
              className="w-full mb-4 p-2 border rounded"
              value={nuevoProyecto.estado}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, estado: e.target.value })}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.idProyecto} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              {/* nombre del proyecto */}
              <h2 className="text-2xl font-bold">{project.nombre}</h2>
              <div className="flex space-x-3">
                <span
                  className={`px-4 py-1 rounded-md text-sm
                    ${project.estado === "Finalizado"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"}
                  `}
                >
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
                <span className="text-red-500 font-medium">
                  {new Date(project.fechaFin).toLocaleDateString()}
                </span>
              </div>
              <button
                className={`px-4 py-2 rounded text-white ${
                  project.estado === "Pendiente"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
                onClick={() => handleToggleEstadoProyecto(project)}
              >
                {project.estado === "Pendiente" ? "Marcar como Finalizado" : "Marcar como Pendiente"}
              </button>
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
