import { useEffect, useState } from "react";
import { Users, Lightbulb, Edit, Trash2, CheckCircle, Filter } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Task } from "../types/Task";
import axios from "axios";

interface TasksProps {
  tasks: Task[];
  usuario: {
    idUsuario: number;
    rol: string;
  };
}

// Función para obtener el nombre del usuario asignado
const getUserNameByTaskId = async (taskId: number) => {
  try {
    const response = await axios.get(`/api/todo/${taskId}/username`);
    return response.data; // Devuelve el nombre del usuario
  } catch (error) {
    console.error(`Error fetching username for task ${taskId}:`, error);
    return "Unassigned"; // Devuelve un valor por defecto si hay un error
  }
};

function Tasks({
  tasks,
  usuario,
  onTaskDeleted,
}: TasksProps & { onTaskDeleted?: (id: number) => void }) {
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [fechaFinProyecto, setFechaFinProyecto] = useState<string>("");

  // Obtener el project_id de la primera tarea (si existe)
  const proyectoId = tasks.length > 0 ? tasks[0].project_id : undefined;

  useEffect(() => {
    const fetchUserNames = async () => {
      const names: { [key: number]: string } = {};
      for (const task of tasks) {
        const name = await getUserNameByTaskId(task.id);
        names[task.id] = name;
      }
      setUserNames(names);
    };

    fetchUserNames();
  }, [tasks]);

  useEffect(() => {
    // Obtener la fecha de fin del proyecto
    if (proyectoId) {
      axios.get(`/proyect/${proyectoId}`)
        .then(res => {
          setFechaFinProyecto(res.data.fechaFin); // Suponiendo que el backend devuelve fechaFin como string
        })
        .catch(() => setFechaFinProyecto(""));
    }
  }, [proyectoId]);

  // Estado para manejar las tareas
  const [newTask, setNewTask] = useState("");

  // Función para agregar una nueva tarea
  const addTask = () => {
    if (newTask.trim() !== "") {
      setNewTask("");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
      try {
        await axios.delete(`/api/todo/${id}`);
        if (onTaskDeleted) onTaskDeleted(id);
      } catch {
        alert("Error al eliminar la tarea");
      }
    }
  };


  const tareasUsuario = tasks.filter(
    (task) => task.user_id === usuario.idUsuario
);
  const handleComplete = async (id: number) => {
    if (
      window.confirm("¿Seguro que deseas marcar esta tarea como completada?")
    ) {
      try {
        await axios.put(`/api/todo/${id}/status?status=Completada`);
        // Opcional: recarga la lista de tareas o actualiza el estado local
        if (onTaskDeleted) onTaskDeleted(id); // Si tienes una función para refrescar, úsala aquí
      } catch {
        alert("Error al completar la tarea");
      }
    }
  };

  // Estados para los filtros
  const [estadoFiltro, setEstadoFiltro] = useState<string>("Todos");
  const [prioridadFiltro, setPrioridadFiltro] = useState<string>("Todos");

  // Estado para mostrar/ocultar filtros
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filtrar tareas según los filtros seleccionados
  const tareasFiltradas = tasks.filter(task => {
    const estadoOk = estadoFiltro === "Todos" || task.status === estadoFiltro;
    const prioridadOk = prioridadFiltro === "Todos" || task.prioridad === prioridadFiltro;
    return estadoOk && prioridadOk;
  });

  // Sumar todas las horas reales de las tareas filtradas
  const totalHorasReales = tareasFiltradas.reduce(
    (acc, task) => acc + Number(task.tiempoReal || 0),
    0
  );

  return (
    <div className="h-screen">
      <div>
        <h1 className="text-md text-[#B39D93] ml-4 mt-4">Project / Tasks</h1>
      </div>

      <div className="flex flex-row items-center mt-3">
        <h1 className="ml-4 text-xl">Tasks</h1>
        <Users className="ml-10" />
        <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665] ml-6">
          OnTrack
        </span>
        <div className="flex flex-row items-center space-x-4 ml-auto mr-5">
          {usuario.rol === "ADMIN" && (
            <button
            className="flex justify-center items-center bg-[#C74634] text-white rounded-lg h-10 px-4"
            onClick={addTask}
            >
            <NavLink to="/create" className="ml-2">
              Create Task
            </NavLink>
          </button>
          )}

          <button
            className="flex items-center bg-gray-100 text-gray-700 rounded-lg h-10 px-4 ml-2"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>

          <div className="flex flex-col items-center mb-4">
            <span className="text-sm text-gray-500">Time Spent</span>
            <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">
              {totalHorasReales}h
            </span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <span className="text-sm text-gray-500">Deadline</span>
            <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">
              {fechaFinProyecto ? new Date(fechaFinProyecto).toLocaleDateString() : "Sin fecha"}
            </span>
          </div>
        </div>
      </div>

      {/* Filtros dropdowns, solo si showFilters es true */}
      {showFilters && (
        <div className="flex flex-row gap-4 items-center mb-4 mt-4 ml-4">
          <div>
            <label className="mr-2 font-semibold">Estado:</label>
            <select
              className="border rounded px-2 py-1"
              value={estadoFiltro}
              onChange={e => setEstadoFiltro(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Completada">Completada</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold">Prioridad:</label>
            <select
              className="border rounded px-2 py-1"
              value={prioridadFiltro}
              onChange={e => setPrioridadFiltro(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col items-center p-4">
        <ul className="w-full ">
          {tareasUsuario.map((task, index) => (
            <li
              key={index}
              className="bg-white h-24 p-2 mb-2  rounded-2xl shadow-md"
            >
              <div className="h-full flex flex-row items-center justify-start">
                <Lightbulb />
                <div className=" flex flex-col items-start justify-start ml-4">
                  <span className="font-bold"> {task.title} </span>
                  <div>
                    <span className="text-sm text-gray-500">#{task.id} </span>
                    <span className="mx-2">|</span>
                    <span className="text-sm text-gray-500">
                      opened{" "}
                      {Math.floor(
                        (Date.now() - new Date(task.creation_ts).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago -
                    </span>

                    <span className="text-sm text-gray-500">
                      Assigned to: {usuario.idUsuario === task.user_id ? "You" : userNames[task.id] || "Unassigned"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center mb-4 ml-auto mr-5">
                  <span
                    className={`text-md w-[80px] text-center px-2 rounded-xl ml-4 ${
                      task.prioridad === "High"
                        ? "bg-red-500/60 text-white"
                        : task.prioridad === "Medium"
                          ? "bg-yellow-500/60 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    {task.prioridad}
                  </span>
                  <span
                    className={`ml-4 text-sm w-auto px-2 rounded-xl ${
                      task.status === "Completada"
                        ? "bg-[#4BA665]/15 text-[#4BA665]"
                        : "bg-[#C74634]/15 text-[#C74634]"
                    }`}
                  >
                    {task.status}
                  </span>
                  {/* Botón Completar solo si la tarea NO está completada */}
                  {task.status !== "Completada" && (
                    <button
                      className="p-2 rounded hover:bg-green-100 ml-2"
                      title="Completar"
                      onClick={() => handleComplete(task.id)}
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </button>
                  )}
                  <NavLink
                    to={`/tasks/${task.id}/edit`}
                    className="p-2 rounded hover:bg-[#0000001f] ml-2"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5 text-[#000000]" />
                  </NavLink>
                  <button
                    className="p-2 rounded hover:bg-red-100 ml-2"
                    title="Eliminar"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 className="w-5 h-5 text-[#C74634]" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
