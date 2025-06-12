import { useEffect, useState } from "react";
import { Users, Lightbulb, Edit, Trash2, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Task } from "../types/Task";
import axios from "axios";

interface TasksProps {
  tasks: Task[];
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
  onTaskDeleted,
}: TasksProps & { onTaskDeleted?: (id: number) => void }) {
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});

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
          <button
            className="flex justify-center items-center bg-[#C74634] text-white rounded-lg h-10 px-4"
            onClick={addTask}
          >
            <NavLink to="/create" className="ml-2">
              Create Task
            </NavLink>
          </button>
          <div className="flex flex-col items-center mb-4">
            <span className="text-sm text-gray-500">Time Spent</span>
            <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">
              2M : 0W : 0D
            </span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <span className="text-sm text-gray-500">Deadline</span>
            <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">
              6M : 0W : 0D
            </span>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col items-center p-4">
        <ul className="w-full ">
          {tasks.map((task, index) => (
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
                      - Assigned to: {userNames[task.id] || "Loading..."}
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
